import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid,
    TextField
} from '@mui/material';
import Form from 'src/components/form/Form';
import useEditData from 'src/hooks/useEditData';

const NewUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handlers = {
        verify: () => {
            console.log(values)

            return true
        },

        formData: () => values,

        afterSubmit: (user) => {
            navigate('/app/users/privileges/' + user._id);
        }
    }

    useEditData(
        id && '/users/find/' + id,
        data => {
            setValues(data)
        }
    )

    return (
        <>
            <Helmet>
                <title>{id ? "Edit User" : "Create User"} | Electro Leaf</title>
            </Helmet>

            <Form
                title={id ? "Edit User" : "Add User"}
                subheader={id ? "Edit User details" : "Create new user details"}
                handlers={handlers}
                action={id ? "/users/" + id : "/users"}
                method={id ? "PUT" : "POST"}

            >
                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        item
                        container
                        spacing={3}
                        lg={12}
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
                                label="First Name"
                                name="firstname"
                                onChange={handleChange}
                                required
                                value={values.firstname}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastname"
                                onChange={handleChange}
                                required
                                value={values.lastname}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                helperText="Please specify new email"
                                name="email"
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                                error={errors.email}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Password"
                                helperText="Password for the new user"
                                name="password"
                                onChange={handleChange}
                                required
                                value={values.password}
                                variant="outlined"
                                error={errors.password}
                            />
                        </Grid>

                    </Grid>
                </Grid>

            </Form>
        </>
    );
}

export default NewUser;
