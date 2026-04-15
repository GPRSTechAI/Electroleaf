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
import Repeat from './schedule/Repeat'
import Once from './schedule/Once'
import Interval from './schedule/Interval'
import OnReading from './schedule/OnReading'
import NavigationButton from './NavigationButton';

const Schedule = ({ values, setValues }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleTypeChange = (type) => {
        setValues(values => ({ ...values, type }))
    }

    useEffect(() => {
        setValues({
            ...values,
            time: moment(values.time || []).format('HH:mm')
        });
    }, [])

    return (
        <>

            <Grid
                mb={2}
                item
            >
                <Button variant={values.type === "repeat" ? "contained" : "outlined"} color="secondary" width={1} onClick={() => handleTypeChange('repeat')}>
                    Repeat
                </Button>
                <Button sx={{ ml: 1 }} variant={values.type === "interval" ? "contained" : "outlined"} color="secondary" width={1} onClick={() => handleTypeChange('interval')}>
                    Interval
                </Button>
                <Button sx={{ ml: 1 }} variant={values.type === "once" ? "contained" : "outlined"} color="secondary" width={1} onClick={() => handleTypeChange('once')}>
                    Once
                </Button>
                <Button sx={{ ml: 1 }} variant={values.type === "onReading" ? "contained" : "outlined"} color="secondary" width={1} onClick={() => handleTypeChange('onReading')}>
                    On sensor reading
                </Button>
            </Grid>
            {values.type === 'repeat'
                ? <Repeat values={values} setValues={setValues} />
                : values.type === 'interval' ? <Interval values={values} setValues={setValues} />
                    : values.type === 'once' ? <Once values={values} setValues={setValues} />
                        : <OnReading values={values} setValues={setValues} />
            }
            <NavigationButton next='devices' />
        </>
    );
}

export default Schedule;
