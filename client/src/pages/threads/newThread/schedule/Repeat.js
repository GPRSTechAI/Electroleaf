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

const Repeat = ({ values, setValues }) => {
    const handleChange = (event) => {
        const newValues = { ...values }
        newValues.schedule.repeat[event.target.name] = event.target.value
        setValues(newValues);
    };

    const handleClickDay = (day, run) => {
        const newValues = { ...values }
        if (run) {
            newValues.schedule.repeat.days.push(day)
            setValues(newValues)
        } else {
            newValues.schedule.repeat.days = newValues.schedule.repeat.days.filter(arrayDay => arrayDay !== day)
            setValues(newValues)
        }
    }
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
                        value={values.schedule.repeat.time}
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <Grid
                mt={0}
                spacing={1}
                container
            >
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, id) => (
                    <Grid
                        key={id}
                        mt={0}
                        item
                    >
                        <Button
                            sx={{ mx: 0 }}
                            variant={values.schedule.repeat.days.includes(id) ? "contained" : "outlined"}
                            size="small"
                            color="secondary"
                            width={1}
                            onClick={() => handleClickDay(id, !values.schedule.repeat.days.includes(id))}
                        >
                            {day}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Grid
                mt={1}
                item
            >
                <Button variant="contained" color="primary" width={1} onClick={() => handleFrequent('repeat')}>
                    More
                </Button>
            </Grid>
        </>
    );
}

export default Repeat;