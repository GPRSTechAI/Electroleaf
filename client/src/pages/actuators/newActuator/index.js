import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Grid,
  TextField,
  Card,
  CardActions,
  CardContent,
  Divider,
  Avatar,
  Button
} from '@mui/material';
//import SensorProfile from 'src/components/sensors/newSensor/SensorProfile';
import Form from 'src/components/form/Form';
import FileUpload from 'src/components/form/FileUpload';
import useEditData from 'src/hooks/useEditData';
import getInitials from 'src/utils/getInitials';

const NewActuator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    id: '',
    name: '',
    board: '',
    image: null,
    imageRemoved: false
  });
  const [file, setFile] = useState()
  const [idError, setIdError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const setImageFile = file => {
    setFile(file)
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setValues(values => ({ ...values, image: { url: reader.result }, imageRemoved: false }));
    reader.onerror = error => console.log(error);
  }

  const removeImage = () => {
    setValues(values => ({ ...values, image: null, imageRemoved: true }))
  }

  const handlers = {
    verify: () => {
      setIdError(false);
      setNameError(false);
      if (values.name.length < 3) {
        setNameError(true)
        return false
      }
      if (!values.id) {
        //alert('Id field can not be empty')
        setIdError(true)
        return false
      }

      return true
    },

    formData: () => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key])
      }
      file && data.append('file', file)
      return data
    },
    //callback function to do after form submitted

    afterSubmit: () => {
      console.log('success')
      navigate('/app/actuators');
    }
  }

  useEditData(
    id && '/actuators/find/' + id,
    data => {
      if (id) {
        setValues({ ...data, imageRemoved: false })
      }
    }
  )

  return (
    <>
      <Helmet>
        <title>New Actuators | Electro Leaf</title>
      </Helmet>

      <Form
        title={id ? "Edit Actuator" : "Add Actuator"}
        subheader={id ? "Edit Actuator details" : "Add new Actuator details"}
        handlers={handlers}
        action={id ? "/actuators/" + id : "/actuators"}
        method={id ? "PUT" : "POST"}

      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Avatar
                    src={values.image ? values.image.url : values.imageRemoved ? '' : '/static/images/avatars/camera-avatar.jpg'}
                    sx={{
                      height: 200,
                      width: 200,
                      fontSize: '4rem',
                    }}
                  >
                    {getInitials(values.name)}
                  </Avatar>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ flexDirection: 'column' }}>
                <FileUpload
                  setImageFile={setImageFile}
                  buttonProps={{ variant: 'outlined' }}
                >
                  {values.image ? "Change picture" : "Select picture"}
                </FileUpload>
                <Button variant='outlined' sx={{ mt: 1 }} fullWidth onClick={removeImage}>Remove Picture</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            item
            container
            spacing={3}
            lg={8}
            md={6}
            xs={12}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Actuator ID"
                helperText="Unique Id"
                name="id"
                onChange={handleChange}
                required
                value={values.id}
                variant="outlined"
                error={idError}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Actuator Name"
                helperText="Please specify the name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
                error={nameError}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Board id"
                helperText="Please specify the board"
                name="board"
                onChange={handleChange}
                required
                value={values.board}
                variant="outlined"
                error={nameError}
              />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}

export default NewActuator;
