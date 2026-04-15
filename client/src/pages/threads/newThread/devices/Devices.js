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
    Alert,
    AlertTitle,
    IconButton
} from '@mui/material';
import { Trash2 as TrashIcon } from 'react-feather'
import useFetch from 'src/hooks/useFetch';
import moment from 'moment';
import NavigationButton from '../NavigationButton';
import SensorParameters from './SensorParameters'
import Actuators from './Actuators'

const sensorParameters = [
    { id: '123', label: '1234' },
    { id: '123', label: '1515' },
    { id: '123', label: 'tyhe' },
]

const Devices = ({ values, setValues }) => {
    const { id, tab } = useParams();
    const navigate = useNavigate();

    const [sensorParameters, isLoading] = useFetch('/sensors/parameters')
    const [actuators, isALoading] = useFetch('/actuators')

    const [paramAnchorEl, setParameterAnchorEl] = useState(null);
    const [actuatorAnchorEl, setActuatorAnchorEl] = useState(null);

    const [selectedParameters, setSelectedParameters] = useState([])
    const [selectedActuators, setSelectedActuators] = useState([])

    const paramOpen = Boolean(paramAnchorEl);
    const actuatorOpen = Boolean(actuatorAnchorEl);

    const paramHandleClick = (event) => {
        setParameterAnchorEl(event.currentTarget);
    };
    const paramHandleClose = () => {
        setParameterAnchorEl(null);
    };
    const actuatorHandleClick = (event) => {
        setActuatorAnchorEl(event.currentTarget);
    };
    const actuatorHandleClose = () => {
        setActuatorAnchorEl(null);
    };

    const handleAddParameter = (parameter) => {
        setSelectedParameters(parameters => [...parameters, { ...parameter, feedReadings: 1 }])
        paramHandleClose()
    }
    const handleRemoveParameter = id => {
        console.log(selectedParameters.splice(id, 1))
        setSelectedParameters([...selectedParameters].splice(id, 1))
    }
    const handleAddActuator = (parameter) => {
        setSelectedActuators(parameters => [...parameters, { ...parameter, feedReadings: 1 }])
        paramHandleClose()
    }
    const handleRemoveActuator = id => {
        console.log(selectedActuators.splice(id, 1))
        setSelectedActuators([...selectedActuators].splice(id, 1))
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleClickMove = (to) => {
        navigate(location.pathname.replace(tab, to))
    }

    useEffect(() => {
        setValues({
            ...values,
            time: moment(values.time || []).format('HH:mm')
        });
    }, [])

    return (
        <>

            <SensorParameters values={values} setValues={setValues} />

            <Divider sx={{
                marginTop: 2,
                marginBottom: 2,
            }} />

            <Actuators values={values} setValues={setValues} />

            <NavigationButton previous="schedule" next="condition" />
        </>
    );
}

export default Devices;
