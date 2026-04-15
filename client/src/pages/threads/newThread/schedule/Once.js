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
    Divider
} from '@mui/material';
import Form from 'src/components/form/Form';
import useEditData from 'src/hooks/useEditData';
import moment from 'moment';

const Once = ({ values, setValues }) => {
    const handleChange = (event) => {
        const newValues = { ...values }
        newValues.schedule.once[event.target.name] = event.target.value
        setValues(newValues);
    };
    return (
        <>
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
                        label="Time"
                        helperText="Command sending time"
                        name="time"
                        type="time"
                        onChange={handleChange}
                        required
                        value={values.schedule.once.time}
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
                        label="Date"
                        helperText="Command sending date"
                        name="date"
                        type="date"
                        onChange={handleChange}
                        required
                        value={values.schedule.once.date}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default Once;