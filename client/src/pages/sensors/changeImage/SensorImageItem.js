import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FileUpload from 'src/components/form/FileUpload';
import Form from 'src/components/form/Form';

const SensorImageItem = ({ type, image: propImage, id, name }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [image, setImage] = useState(propImage)

    useEffect(() => {
        setImage(propImage)
    }, [propImage])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const afterSubmit = (data) => {
        setImage(data)
        handleClose()
    }

    const afterDelete = () => {
        setImage(null)
        handleClose()
    }

    return (
        <>
            <ImageListItem sx={{ aspectRatio: 1 }}>
                <img
                    src={image?.url || '/static/images/avatars/camera-avatar.jpg'}
                    alt={id}
                    loading="lazy"
                />
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    title={type + " - " + id}
                    subtitle={type === "Parameter" ? name : "Sensor Image"}
                    position="top"
                    actionIcon={
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${id}`}
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreIcon />
                        </IconButton>
                    }
                />
            </ImageListItem>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <MenuItem><FileUpload action={`/sensors/image/${type === 'Sensor' ? 'sensor' : 'parameter'}/${id}`} onSuccess={afterSubmit}>{image ? "Replace Image" : "Add Image"}</FileUpload></MenuItem>
                {image && <MenuItem>
                    <Form method="DELETE" formonly handlers={{ afterSubmit: afterDelete }} action={`/sensors/image/${type === 'Sensor' ? 'sensor' : 'parameter'}/${id}`}>
                        <Button type="submit">Remove Image</Button>
                    </Form>
                </MenuItem>}
            </Menu>
        </>
    )
};

export default SensorImageItem;
