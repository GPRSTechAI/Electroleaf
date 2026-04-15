import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import {useState} from 'react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  return (
    <>
      <Helmet>
        <title>Reset Password | ElectroLeaf</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
            })}
            onSubmit={(values, {setErrors, setSubmitting}) => {
              setError("")
              const options = {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "email": values.email
                })
              }
              fetch(process.env.REACT_APP_API_HOST +"/auth/forgotPassword", options)
              .then(async(response) => {
                console.log(response)
                const data = await response.json()
                if(response.status === 400 || !data.status){
                  setError(data.error || "Some error occured")
                }else{
                  alert("Please check your mail")
                  navigate('/login', { replace: true });
                }
                setSubmitting(false)
              })
              .catch(error=>{
                console.error(error)
                setSubmitting(false)
              })
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Reset Password
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Enter your email address
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  {
                    error &&
                    <Alert
                      severity="error"
                      color="error"
                      >
                        {error}
                    </Alert>
                  }

                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Reset Password
                  </Button>
                </Box>

                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
