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
import { useState } from 'react';
import { useAuth } from 'src/context/AuthContext'

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const { login } = useAuth()
    return (
        <>
            <Helmet>
                <title>Login | ElectroLeaf</title>
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
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
                        })}
                        onSubmit={(values, { setErrors, setSubmitting }) => {
                            setError("")
                            login(values.email, values.password)
                                .then(() => {
                                    navigate('/app/dashboard', { replace: true });
                                })
                                .catch(error => {
                                    setError("Invalid credientials")
                                    setSubmitting(false)
                                })
                            // const options = {
                            //     method: "POST",
                            //     headers: { 'Content-Type': 'application/json' },
                            //     body: JSON.stringify({
                            //         "email": values.email,
                            //         "password": values.password
                            //     })
                            // }
                            // fetch(process.env.REACT_APP_API_HOST + "/auth/login", options)
                            //     .then(async (response) => {
                            //         console.log(response)
                            //         if (response.status === 401) {
                            //             setError("Invalid credientials")
                            //         } else {
                            //             const data = await response.json()
                            //             localStorage.setItem("jwt", data.accessToken)
                            //             navigate('/app/dashboard', { replace: true });
                            //         }
                            //         setSubmitting(false)
                            //     })
                            //     .catch(error => {
                            //         console.error(error)
                            //         setSubmitting(false)
                            //     })
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
                                        Log in
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Log in to Electro Leaf dashboard
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
                                <Box sx={{ py: 2 }}>
                                    {
                                        error &&
                                        <Alert
                                            severity="error"
                                            color="error"
                                            sx={{ mb: 1 }}
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
                                        Sign in now
                                    </Button>
                                </Box>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    <Link
                                        component={RouterLink}
                                        to="/forgotPassword"
                                        variant="h6"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Forgot Password?
                                    </Link>
                                </Typography>

                                {/* <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography> */}
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </>
    );
};

export default Login;
