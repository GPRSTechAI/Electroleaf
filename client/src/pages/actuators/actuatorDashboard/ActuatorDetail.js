import { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Grid
} from '@mui/material';
import getInitials from 'src/utils/getInitials';

const ActuatorDetail = ({ actuator: actuatorDetail, toastMessage, ...props }) => {
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true);

    const sendRequest = (url, data, method = 'POST') => {
        setDisabled(true)
        setLoading(true)
        fetch(process.env.REACT_APP_API_HOST + url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw (await res.json())
                }
                return res.json()
            })
            .then(data => {
                setLoading(false)
                toastMessage({ message: data.value ? "Actuator started" : "Actuator stopped", severity: "success" })
            })
            .catch(e => {
                setLoading(false)
                toastMessage({ message: e.error, severity: "error" })
            })
    }

    const handleStart = () => {
        sendRequest('/commands', { actuatorId: actuatorDetail.id, value: 1, duration: -1 })
    }

    const handleStop = () => {
        sendRequest('/commands', { actuatorId: actuatorDetail.id, value: 0, duration: -1 })
    }

    useEffect(() => {
        if (actuatorDetail.id && !loading) {
            setDisabled(false)
        }
    }, [actuatorDetail])

    return (
        <Grid
            item
            lg={3}
            md={4}
            sm={6}
            xl={3}
            xs={12}
        >
            <Card {...props}>
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar
                            src={actuatorDetail.image?.url}
                            sx={{
                                width: '50%',
                                height: 'unset',
                                aspectRatio: '1 / 1',
                                fontSize: '4rem',
                                my: 1
                            }}
                        >
                            {actuatorDetail.name ? getInitials(actuatorDetail.name) : getInitials("Actuators")}
                        </Avatar>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h3"
                        >
                            {actuatorDetail.name ? actuatorDetail.name : "Actuators"}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            <b>Id:</b> {actuatorDetail.id}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            <b>Name:</b> {actuatorDetail.name}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            <b>Board:</b> {actuatorDetail.board}
                        </Typography>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions>
                    {actuatorDetail.command?.running
                        ?
                        <Button
                            color="error"
                            fullWidth
                            variant="contained"
                            disabled={disabled}
                            onClick={handleStop}
                        >
                            Stop
                        </Button>
                        :
                        <Button
                            color="primary"
                            fullWidth
                            variant="contained"
                            disabled={disabled}
                            onClick={handleStart}
                        >
                            Start
                        </Button>
                    }
                </CardActions>
            </Card>
        </Grid>
    );
}

export default ActuatorDetail;
