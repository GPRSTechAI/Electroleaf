import { useState, useEffect } from 'react';
import moment from 'moment';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import getInitials from 'src/utils/getInitials';
import useFetch from 'src/hooks/useFetch';
import useIntervalFetch from 'src/hooks/useIntervalFetch';

const ActuatorDetail = ({ id, ...props }) => {
    const [actuatorDetail] = useIntervalFetch('/actuators/find/' + id, 5000)
    const [disabled, setDisabled] = useState(true);

    const sendRequest = (url, data, method = 'POST') => {
        fetch(process.env.REACT_APP_API_HOST + url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(data => {
            setIsPending(false)
            afterSubmit(data)
        })
            .catch(console.log)
    }

    const handleStart = () => {
        setDisabled(true)
        sendRequest('/commands', { actuatorId: id, value: 1, duration: -1 })
    }

    const handleStop = () => {
        setDisabled(true)
        sendRequest('/commands', { actuatorId: id, value: 0, duration: -1 })
    }

    useEffect(() => {
        if (actuatorDetail.id) {
            setDisabled(false)
        }
    }, [actuatorDetail])

    return (
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
                        src={actuatorDetail.avatar}
                        sx={{
                            height: 200,
                            width: 200,
                            fontSize: 100
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
                        Id: {actuatorDetail.id}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        Name: {actuatorDetail.name}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        {`Created at ${moment(actuatorDetail.createdAt).format('hh:mm A')}`}
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
    );
}

export default ActuatorDetail;
