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

const NewTank = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        id: '',
        name: '',
        unit: ''
    });
    const [idError, setIdError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
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

        formData: () => values,

        afterSubmit: () => {
            console.log('success')
            navigate('/app/tanks');
        }
    }

    useEditData(
        '/tanks/find/' + id,
        data => {
            if (id) {
                setValues(data)
            }
        }
    )

    return (
        <>
            <Helmet>
                <title>{id ? "Edit Tank" : "Add Tank"} | Electro Leaf</title>
            </Helmet>

            <Form
                title={id ? "Edit Tank" : "Add Tank"}
                subheader={id ? "Edit Tank details" : "Add new Tank details"}
                handlers={handlers}
                action={id ? "/tanks/" + id : "/tanks"}
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
                                label="Tank ID"
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
                                label="Tank Name"
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
                                label="Unit"
                                helperText="Please specify the unit"
                                name="unit"
                                onChange={handleChange}
                                required
                                value={values.unit}
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>
                </Grid>

            </Form>
        </>
    );
}

export default NewTank;
