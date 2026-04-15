import { useEffect, useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import Form from 'src/components/form/Form';
import moment from 'moment';
import useFetch from 'src/hooks/useFetch';
import useEditData from 'src/hooks/useEditData';
import { useParams } from 'react-router';
//{ time: '', sensorId: sensorDetail.id, readings: sensorDetail.parameters.map(parameter => ({ parameterId: parameter.id, value: 0 })) }

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewReading = ({ sensorDetail, readingId, open, handleClose }) => {
    const [readingDetail, setReadingDetail] = useState({})
    const [readings, setReadings] = useState([])
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setReadingDetail({
            ...readingDetail,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeReadings = (e, id) => {
        const clonedReadings = [...readings];
        clonedReadings[id].value = e.target.value
        setReadings(clonedReadings);
    };

    const handlers = {
        verify: () => {
            if (!readingDetail.time) {
                return false
            }
            else if (readings.value === '') {
                return false
            }
            return true
        },
        formData: () => ({ sensorId: sensorDetail.id, ...readingDetail, readings, time: moment(readingDetail.time).valueOf() }),
        afterSubmit: () => {
            console.log('success')
            handleClose()
        }
    }
    useEffect(() => {
        if (!open) return
        if (!readingId && sensorDetail.id) {
            setReadings(sensorDetail.parameters.map(parameter => ({ parameterId: parameter.id, value: "" })))
            setReadingDetail({
                ...readingDetail,
                time: moment(readingDetail.time || []).format('YYYY-MM-DDTHH:mm')
            });
        } else {
            setLoading(true)
        }
    }, [open])

    useEditData(readingId && '/sensorReadings/find/' + readingId,
        (data) => {
            setReadingDetail({ time: moment(data.time).format('YYYY-MM-DDTHH:mm') })
            setReadings(data.readings)
            setLoading(false)
        }
    )
    if (!sensorDetail.id) return null
    if (loading) return null
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Form
                    title="Add Reading"
                    subheader="Add new sensor reading"
                    handlers={handlers}
                    action={readingId ? "/sensorReadings/" + readingId : "/sensorReadings"}
                    method={readingId ? "PUT" : "POST"}
                    noContainer
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
                                value={readingDetail.time}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        {sensorDetail.parameters.map((parameter, id) => (
                            <Grid
                                key={id}
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label={parameter.name}
                                    helperText={`Parameter ${parameter.name} with id ${parameter.id}`}
                                    name="parameter"
                                    onChange={e => handleChangeReadings(e, id)}
                                    required
                                    value={readings[id]?.value}
                                    variant="outlined"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Form>
            </Dialog>
        </>
    );
}

export default NewReading;
