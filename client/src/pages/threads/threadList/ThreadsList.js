import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Typography,
    Chip
} from '@mui/material';
import ThreadsListToolbar from './ThreadsListToolbar';
import CustomTable from 'src/components/CustomTable';
import moment from 'moment';

import CheckIcon from '@mui/icons-material/Check';
import XIcon from '@mui/icons-material/Close';

const columns = [
    {
        headerName: 'Type', width: 150, render: (i, id) => (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="body1"
                >
                    {i.type[0].toUpperCase() + i.type.substring(1)}
                </Typography>
            </Box>
        )
    },
    { field: '_id', headerName: 'Thread ID', width: 90 },
    {
        field: 'time', headerName: 'Time', width: 90, render: (i) => {
            switch (i.type) {
                case 'repeat':
                    return (
                        `At ${moment(i.schedule.repeat.time.hour + ":" + i.schedule.repeat.time.minute, "HH:mm").format("hh:mm a")} (${i.schedule.repeat.days.length >= 0 ? "everyday" : "customized"})`
                    )
                case 'interval':
                    return (
                        "For every " + i.schedule.interval.interval + " mins"
                    )
                case 'once':
                    return (
                        "On " + moment(i.schedule.once.dateTime).format('DD/MM/YYYY') + ", at " + moment(i.schedule.once.dateTime).format('hh:mm')
                    )
            }
        }
    },
    {
        headerName: 'Status', width: 150, render: (i, id) => (
            <Chip
                color={i.execute ? "primary" : "secondary"}
                label={i.execute ? 'Running' : 'Paused'}
                size="small"
            />
        )
    },
    { field: 'createdAt', headerName: 'Created Date', width: 90, render: (i, id) => moment(i.createdAt).format('DD/MM/YYYY') },
];

const ThreadsList = () => {
    const handleExecuteClick = (item, id, callback) => {
        item.execute = !item.execute
        fetch(process.env.REACT_APP_API_HOST + '/threads/changeExecution', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: item._id, execute: item.execute })
        }).then(res => {
            callback(item)
        })
    }
    return (
        <>
            <Helmet>
                <title>Threads | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <ThreadsListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <CustomTable
                            title="Sensors"
                            columns={columns}
                            itemsUrl='/threads'
                            actions={{
                                editRoute: ({ _id }) => `edit/${_id}`,
                                viewRoute: ({ _id }) => `${_id}`,
                                delUrl: ({ _id }) => `/sensors/${_id}`
                            }}
                            customActions={[
                                {
                                    label: ({ execute }) => execute ? "Stop" : "Execute",
                                    onClick: handleExecuteClick,
                                    icon: ({ execute }) => execute ? <XIcon /> : <CheckIcon />,
                                    confirmation: {
                                        title: 'Confirm Command',
                                        message: 'Confrim changing the Thread execution'
                                    }
                                },
                            ]}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default ThreadsList;
