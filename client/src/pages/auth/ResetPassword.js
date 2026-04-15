import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const urlParams = useParams()

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
              password: '',
              confirmPassword: '',
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string().min(4).max(255).required('Password is required'),
              confirmPassword: Yup.string().min(4).max(255).required('confirm Password is required').oneOf([Yup.ref("password"), null])
            })}
            onSubmit={(values, {setSubmitting}) => {
              setError("")
              const options = {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  "newPassword": values.password,
                  email: urlParams.email,
                  token: urlParams.token
                })
              }
              fetch(process.env.REACT_APP_API_HOST +"/auth/resetPassword", options)
              .then(async(response) => {
                console.log(response)
                const data = await response.json()
                if(response.status === 400 || !data.status){
                  setError(data.error || "Some error occured")
                }else{
                  alert("Password changed")
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
                    Enter your password address
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Confirm Password"
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
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

export default ResetPassword;
