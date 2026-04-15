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

const OnReading = ({ values, setValues }) => {
    const handleChange = (event) => {
        const newValues = { ...values }
        newValues.schedule.onReading[event.target.name] = event.target.value
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
                        label={<span>On n <sup>th</sup> sensor reading</span>}
                        helperText="Execute after each times of readings"
                        name="number"
                        type="number"
                        onChange={handleChange}
                        required
                        value={values.schedule.onReading.number}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default OnReading;