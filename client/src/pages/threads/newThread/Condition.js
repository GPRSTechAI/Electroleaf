import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Grid,
    TextField,
    Button,
    Tabs,
    Tab,
    Typography,
    Divider,
    Menu,
    MenuItem,
    Card,
    CardContent,
    Container,
    Checkbox,
    FormControlLabel,
    Alert,
    AlertTitle
} from '@mui/material';
import Form from 'src/components/form/Form';
import useEditData from 'src/hooks/useEditData';
import moment from 'moment';
import NavigationButton from './NavigationButton';

const sensorParameters = [
    { id: '123', label: '1234' },
    { id: '123', label: '1515' },
    { id: '123', label: 'tyhe' },
]

const Condition = ({ values, setValues }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // const [values, setValues] = useState({ condition: true, conditionFile: '' })

    const handleCondChange = e => {
        const newValues = { ...values }
        newValues.condition.condition = e.target.checked
        setValues(newValues)
    }

    const handleChange = (event) => {
        const newValues = { ...values }
        newValues.condition.conditionFile = event.target.value
        setValues(newValues);
    };

    const handleDurationChange = (event) => {
        const newValues = { ...values }
        newValues.condition.duration = event.target.value
        setValues(newValues);
    };

    const handlers = {
        formData: () => values,
        //callback function to do after form submitted
        afterSubmit: () => {
            console.log('success')
            navigate('/app/sensors');
        }
    }

    useEditData(
        id && '/sensors/' + id,
        data => {
            if (id) {
                setValues(data)
            }
        }
    )

    return (
        <>


            <Grid
                mt={3}
                item
            >
                <FormControlLabel
                    label="Condition"
                    control={
                        <Checkbox
                            checked={values.condition.condition}
                            onChange={handleCondChange}
                        />
                    }
                />
            </Grid>
            {values.condition.condition ?
                <>
                    <Grid
                        mt={3}
                        item
                    >
                        <TextField
                            fullWidth
                            label="Condition File"
                            helperText="File name which contains condition function"
                            name="conditionFile"
                            type="text"
                            onChange={handleChange}
                            required
                            value={values.condition.conditionFile}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid
                        item
                    >
                        <Alert severity="info">
                            <AlertTitle>Function in the file</AlertTitle>
                            Your file must contain a python function named as <strong>conditionFunction</strong>.<br />
                            Sensor readings will be passed to the function through parameter
                        </Alert>
                    </Grid>
                </>
                : <Alert severity="warning">This this thread will run on scheduled time without any checking for condition</Alert>
            }

            <Grid
                mt={3}
                item
            >
                <TextField
                    fullWidth
                    label="Duration"
                    helperText="Actuator executing duration"
                    name="duration"
                    type="text"
                    onChange={handleDurationChange}
                    required
                    value={values.condition.duration}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <NavigationButton previous='devices' />
        </>
    );
}

export default Condition;