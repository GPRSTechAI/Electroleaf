import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  TextField,
  Modal,
  Backdrop,
  Fade
} from '@mui/material';
import Form from 'src/components/form/Form';
import FileUpload from 'src/components/form/FileUpload';
import moment from 'moment';

const NewSensorImage = ({ image, setImage, open, handleClose }) => {
  const { _id: id } = image;
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null)

  const handleChange = (event) => {
    setImage({
      ...image,
      [event.target.name]: event.target.value
    });
  };
  const handlers = {
    verify: () => {
      if (!image.time) {
        return false
      }
      return true
    },
    formData: () => ({ ...image, time: moment(image.time).valueOf(), file: imageFile }),
    afterSubmit: () => {
      console.log('success')
      handleClose()
    }
  }

  useEffect(() => {
    if (imageFile) {
      setImageUrl(URL.createObjectURL(imageFile))
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageFile]);

  useEffect(() => {
    if (open) {
      setImageFile(null)
      setImageUrl(null)
    }
  }, [open])

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          overflow: 'auto'
        }}
      >
        <Fade in={open}>
          <div>
            <Form
              title="Add Reading"
              subheader="Add new sensor reading"
              handlers={handlers}
              action={id ? "/sensorImages/" + id : "/sensorImages"}
              method={id ? "PUT" : "POST"}
              noContainer
              fileUpload
            >
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText="Reading time"
                    label="Time"
                    name="time"
                    onChange={handleChange}
                    required
                    type="datetime-local"
                    value={image.time}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  {imageFile && <div style={{ width: '100%', textAlign: 'center' }}><img style={{ height: 250 }} src={imageUrl} alt="Error" /></div>}
                  <FileUpload
                    setImageFile={setImageFile}
                    buttonText="Finish"
                  >
                    {imageFile ? "Change" : "Add Image"}
                  </FileUpload>

                </Grid>
              </Grid>
            </Form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default NewSensorImage;
