import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Grid,
    TextField,
    Button
} from '@mui/material';
import Form from 'src/components/form/Form';
import useEditData from 'src/hooks/useEditData';
import SensorInput from './SensorInput';

const NewSensor = () => {
    const { id } = useParams();
    const defaultValue = { id: '', name: '', unit: '', _type: 'new' }
    const [inputFields, setInputFields] = useState([defaultValue])
    const [deletedItems, setDeletedItems] = useState([])
    const [sensorDetails, setSensorDetails] = useState({ id: '', board: '' })
    const navigate = useNavigate();

    const handleChange = (e, id) => {
        const values = [...inputFields];
        values[id][e.target.name] = e.target.value;
        setInputFields(values)
    }

    const handleSensorChange = (event) => {
        setSensorDetails({
            ...sensorDetails,
            [event.target.name]: event.target.value
        });
    }

    const handleAddField = (id) => {
        setInputFields([...inputFields, defaultValue])
    }

    const handleRemoveField = (id) => {
        if (inputFields[id]._type === 'old') setDeletedItems([...deletedItems, inputFields[id].id])
        setInputFields(inputFields.filter((item, _id) => id !== _id))
        if (inputFields.length === 0) {
            setInputFields(defaultValue)
        }
    }
    const handlers = {
        formData: () => ({ ...sensorDetails, parameters: inputFields.filter(item => item.id !== ''), removedParameters: deletedItems }),
        //callback function to do after form submitted
        afterSubmit: ({ _id }) => {
            navigate('/app/sensors/image/' + _id);
        }
    }

    useEditData(
        id && '/sensors/find/' + id,
        ({ parameters, ...sensorDetail }) => {
            if (id) {
                // console.log(data)
                setSensorDetails(sensorDetail)
                parameters.forEach(item => {
                    item._type = 'old'
                })
                setInputFields(parameters)
                // setValues(data)
            }
        }
    )

    return (
        <>
            <Helmet>
                <title>{id ? "Edit Sensor" : "Add Sensor"} | Electro Leaf</title>
            </Helmet>

            <Form
                title={id ? "Edit Sensor" : "Add Sensor"}
                subheader={id ? "Edit Sensor details" : "Add new sensor details"}
                handlers={handlers}
                action="/sensors"
                method={id ? "PUT" : "POST"}
            >
                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Sensor ID"
                            helperText="Unique Id"
                            name="id"
                            onChange={handleSensorChange}
                            required
                            value={sensorDetails.id}
                            variant="outlined"
                            inputProps={
                                { readOnly: !!id }
                            }
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            helperText="Please specify the board id"
                            label="Board id"
                            name="board"
                            onChange={handleSensorChange}
                            required
                            value={sensorDetails.board}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <Button onClick={e => handleAddField()} variant="contained">Add parameter </Button>
                    </Grid>
                    {inputFields.map((inputField, id) => (
                        <SensorInput
                            key={id}
                            inputField={inputField}
                            id={id}
                            handleChange={handleChange}
                            handleAddField={handleAddField}
                            handleRemoveField={handleRemoveField}

                        />
                    ))}

                </Grid>
            </Form>
        </>
    );
}

export default NewSensor;
