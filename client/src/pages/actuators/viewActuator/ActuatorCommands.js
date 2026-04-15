import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    LinearProgress
} from '@mui/material';
import moment from 'moment';
import CustomTable from 'src/components/CustomTable';
import useIntervalFetch from 'src/hooks/useIntervalFetch';

const interval = 10000;
const progressFrequent = 50         // Do not set the value to 0

const columns = [
    { field: 'time', headerName: 'Time', width: 50, render: (i, id) => moment(i.time).format('DD/MM/YYYY hh:mm:ss') },
    { field: 'duration', headerName: 'Duration', width: 50, render: ({ duration }, id) => (duration === -1) ? 'Infinite' : moment.utc(duration).format('HH:mm:ss') },
    { field: 'value', headerName: 'Value', width: 50 },
    { field: 'status', headerName: 'Status', width: 90 },
    { field: 'updatedAt', headerName: 'Updated time', width: 60, render: (i, id) => moment(i.createdAt).format('DD/MM/YYYY hh:mm:ss') }
];

const ActuatorCommands = ({ id, ...props }) => {
    const [command, setCommand] = useState({ time: '', duration: '', actuatorId: id, received: '', frequent: 'repeat', date: null, days: [0, 1, 2, 3, 4, 5, 6] })
    const [actuatorCommands, loading] = useIntervalFetch('/commands/actuator/' + id, interval);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(0)
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                return oldProgress + (100 / progressFrequent)
            });
        }, interval / progressFrequent);

        return () => {
            clearInterval(timer);
        };
    }, [actuatorCommands])

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (item) => {
        setCommand(item)
        handleOpen()
    }

    const scheduleActuatorCommand = () => {
        setCommand({ time: '', duration: '', actuatorId: id, value: 1, frequent: 'repeat', date: null, days: [0, 1, 2, 3, 4, 5, 6] })
        handleOpen()
    }
    return (
        <>
            <Card>
                <CardHeader
                    subheader="List of updated actuator commands"
                    title="Actuator Commands"
                />
                <Divider />
                <CardContent>
                    <LinearProgress variant="determinate" value={progress} />
                    <CustomTable
                        columns={columns}
                        rows={[...actuatorCommands].reverse()}
                        loading={loading}
                        onEditClick={handleEdit}
                        delUrl={({ _id }) => `/actuatorCommands/${_id}`}
                    />
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    {/* <Button
                        color="primary"
                        variant="contained"
                        onClick={scheduleActuatorCommand}
                    >
                        Schedule Actuator Command
                    </Button> */}
                </Box>
            </Card>
            {/* <NewActuatorCommands
                command={command}
                setCommand={setCommand}
                open={open}
                handleClose={handleClose}
            /> */}
        </>
    );
};

export default ActuatorCommands;
