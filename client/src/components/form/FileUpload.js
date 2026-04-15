import { useState, useRef } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    ClickAwayListener,
    Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { withStyles } from '@mui/styles';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Image } from "@mui/icons-material";

function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            resolve(new File([blob], fileName));
        }, 'image/jpeg', 1);
    });
}


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const defaultCrop = { aspect: 1 / 1, x: 0, y: 0, height: 100, unit: '%' }


const FileUpload = ({ children, action, setImageFile, buttonText = "Upload", disabled = false, disableMessage = "", additionalFormData = {}, onSuccess = () => { }, buttonProps = { variant: "text" } }) => {
    const [imageUrl, setImageUrl] = useState();
    const [image, setImage] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({});
    const [crop, setCrop] = useState(defaultCrop);
    const [open, setOpen] = useState(false);
    const inputEle = useRef(null);
    const [imageEle, setImageEle] = useState(null);
    const [tooltip, setTooltip] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            inputEle.current.value = null;
            setIsPending(false)
            setImage(null)
            setImageUrl(null)
        }, 100)
    }

    const onChangeFile = e => {
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        URL.revokeObjectURL(imageUrl)
        setOpen(true);
        setCrop(defaultCrop)
    }

    const onSubmit = e => {
        e.preventDefault();
        setIsPending(true)
        if (!action) {
            setImageFile(image);
            setIsPending(false);
            setOpen(false);
            inputEle.current.value = null;
            setCrop(defaultCrop);
        } else {
            const formData = new FormData();
            formData.append('file', image);
            for (let key in additionalFormData) {
                formData.append(key, additionalFormData[key])
            }
            fetch(process.env.REACT_APP_API_HOST + action, {
                method: 'POST',
                body: formData
            }).then(res => res.json()
            ).then(data => {
                setIsPending(false)
                setUploadedFile(data);
                inputEle.current.value = null;
                setCrop(defaultCrop);
                setOpen(false);
                onSuccess(data)
            })
                .catch(console.log)
        }
    }

    const handleImageLoaded = async image => {
        setImageEle(image)
        try {
            const scale = Math.min(image.height, image.width)
            const croppedImg = await getCroppedImg(image, {
                x: 0,
                y: 0,
                height: scale,
                width: scale
            }, 'cropped.jpeg');
            setImage(croppedImg)
        } catch (e) {
            console.log(e)
        }
    }

    const handleOnCropComplete = async (crop, pixelCrop) => {
        if (imageEle) {
            const croppedImg = await getCroppedImg(imageEle, crop, 'cropped.jpeg');
            console.log(croppedImg)
            setImage(croppedImg)
        }
    }

    const handleTooltipClose = () => {
        setTooltip(false);
    };

    const handleTooltipOpen = () => {
        setTooltip(true);
    };

    return (
        <>
            <div style={{ width: '100%' }}>
                {disabled ?
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={tooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={disableMessage}
                            >
                                <Button
                                    onClick={handleTooltipOpen}
                                    color="primary"
                                    fullWidth
                                    variant="text"
                                    component="label"
                                >{children}</Button>
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
                    :
                    <Button
                        color="primary"
                        fullWidth
                        component="label"
                        {...buttonProps}
                    >
                        {children}
                        <input ref={inputEle} type="file" accept="image/*" hidden onChange={onChangeFile} />
                    </Button>
                }
            </div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Image
                </DialogTitle>
                <DialogContent dividers>
                    <ReactCrop
                        src={imageUrl}
                        crop={crop}
                        onChange={newCrop => setCrop(newCrop)}
                        onImageLoaded={handleImageLoaded}
                        onComplete={handleOnCropComplete}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={onSubmit}
                        color="primary"
                        disabled={isPending}
                    >
                        {buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FileUpload;