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
import moment from 'moment';

const Interval = ({ values, setValues }) => {
    const handleChange = (event) => {
        const newValues = { ...values }
        newValues.schedule.interval[event.target.name] = event.target.value
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
                        label="Interval"
                        helperText="Period in minutes"
                        name="interval"
                        type="number"
                        onChange={handleChange}
                        required
                        value={values.schedule.interval.interval}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default Interval;