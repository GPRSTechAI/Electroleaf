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

const Actuators = ({ values, setValues }) => {
    const [actuators, isLoading] = useFetch('/actuators')

    const [anchorEl, setAnchorEl] = useState(null);

    const selectedActuators = values.devices.actuatorIds
    const setSelectedActuators = selectedActuators => {
        const newValues = { ...values }
        newValues.devices.actuatorIds = selectedActuators
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
        setSelectedActuators([...selectedActuators, { ...parameter, feedReadings: 1 }])
        handleClose()
    }
    const handleRemove = id => {
        const newArray = [...selectedActuators]
        newArray.splice(id, 1)
        setSelectedActuators(newArray)
    }

    useEffect(() => {
        setValues({
            ...values,
            time: moment(values.time || []).format('HH:mm')
        });
    }, [])

    return <>
        <Typography variant="h5" component="span">
            Actuators
        </Typography>

        <Alert severity="info" sx={{ marginTop: 1 }}>
            <AlertTitle>Cannot control each actuators seperately</AlertTitle>
            Same command will be sent to all the registered actuators
        </Alert>

        <Grid
            container
            spacing={3}
            mt={1}
        >
            {selectedActuators.length ? selectedActuators.map((actuator, id) => (
                <Container maxWidth="lg" key={id} style={{ paddingRight: 0 }}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={5}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        disabled
                                        value={actuator.fullName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={2}
                                    xs={12}
                                    color="red"
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
                                No actuators added
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
                    Add Actuators
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
                    {actuators.map((actuator, id) => (
                        <MenuItem key={id} onClick={() => handleAdd(actuator)}>{actuator.fullName}</MenuItem>
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

export default Actuators;