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

const SensorParameters = ({ values, setValues }) => {
    const [sensorParameters, isLoading] = useFetch('/sensors/parameters')

    const [anchorEl, setAnchorEl] = useState(null);

    const selectedParameters = values.devices.sensorParameters
    const setSelectedParameters = selectedParameters => {
        const newValues = { ...values }
        newValues.devices.sensorParameters = selectedParameters
        setValues(newValues)
    }

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleAdd = (parameter) => {
        setSelectedParameters([...selectedParameters, { ...parameter, feedReadings: 1 }])
        handleClose()
    }
    const handleRemove = id => {
        const newArray = [...selectedParameters]
        newArray.splice(id, 1)
        setSelectedParameters(newArray)
    }

    const handleChange = (event, id) => {
        const newSelected = [...selectedParameters]
        newSelected[id].feedReadings = event.target.value
        setSelectedParameters(newSelected)
    };

    useEffect(() => {
        setValues({
            ...values,
            time: moment(values.time || []).format('HH:mm')
        });
    }, [])

    return <>
        <Typography variant="h5" component="span">
            Sensor Parameters
        </Typography>
        <Grid
            container
            spacing={3}
            mt={1}
        >
            {selectedParameters.length ? selectedParameters.map((para, id) => (
                <Container maxWidth="lg" key={id} style={{ paddingRight: 0 }}>
                    <Card>
                        <CardContent>
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
                                        disabled
                                        value={para.fullName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={5}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="No of Readngs"
                                        name="feedReadings"
                                        onChange={e => handleChange(e, id)}
                                        required
                                        type="number"
                                        value={para.feedReadings}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={1}
                                    xs={12}
                                >
                                    <IconButton
                                        color="error"
                                        aria-label="Remove"
                                        component="span"
                                        onClick={() => handleRemove(id)}
                                        size="large">
                                        <TrashIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            )) :
                <Container maxWidth="lg" style={{ paddingRight: 0 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="span" ml={5}>
                                No sensors added
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            }


        </Grid>
        <Grid
            container
            spacing={3}
            mt={1}
        >
            <Grid
                item
                md={6}
                xs={12}
            >
                <Button
                    variant="outlined"
                    aria-controls="demo-positioned-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Add Sensor Parameters
                </Button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    getContentAnchorEl={null}
                >
                    {sensorParameters.map((para, id) => (
                        <MenuItem key={id} onClick={() => handleAdd(para)}>{para.fullName}</MenuItem>
                    ))}
                </Menu>
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
            >
            </Grid>
        </Grid>
    </>;
}

export default SensorParameters;