import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Divider,
    Grid,
    CircularProgress,
    Chip,
} from '@mui/material';
import { styled } from '@mui/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GetAppIcon from '@mui/icons-material/GetApp';
import useFetch from 'src/hooks/useFetch'
import moment from 'moment'
import DetailItem from './DetailItem';

const repaetDays = (days) => {
    const alldays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    return days.map((day) => alldays[day]).join(', ')
}

const ViewThread = () => {
    const { threadId } = useParams()
    const [thread, loading] = useFetch('/threads/find/' + threadId)

    if (loading) return (
        <Container sx={{
            pt: 3,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignItems: 'center'
        }}>
            <CircularProgress />
        </Container>
    )

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
                    <Box sx={{ pt: 3 }}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        pb: 3
                                    }}
                                >
                                </Box>
                                <Typography
                                    align="center"
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h4"
                                >
                                    {thread.type[0].toUpperCase() + thread.type.substring(1)}
                                </Typography>
                                <Typography
                                    align="center"
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    {'Created ' + moment(thread.createdAt).fromNow()}
                                </Typography>
                                <Box
                                    align="center"
                                    sx={{
                                        pt: 1
                                    }}
                                >
                                    <Chip
                                        color={thread.execute ? "primary" : "secondary"}
                                        label={thread.execute ? 'Running' : 'Paused'}
                                        size="small"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        pt: 1
                                    }}
                                >
                                    <Typography
                                        align="center"
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h5"
                                        sx={{
                                            mt: 2
                                        }}
                                    >
                                        Details
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <DetailItem fieldKey="Type" value={thread.type[0].toUpperCase() + thread.type.substring(1)} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <DetailItem fieldKey="Status" value={
                                                <Chip
                                                    color={thread.execute ? "primary" : "secondary"}
                                                    label={thread.execute ? 'Running' : 'Paused'}
                                                    size="small"
                                                />
                                            } />
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        align="center"
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h5"
                                        sx={{
                                            mt: 2
                                        }}
                                    >
                                        Schedule
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {thread.type === 'repeat' ?
                                            <>
                                                <Grid item xs={6}>
                                                    <DetailItem fieldKey="Time" value={moment(thread.schedule.repeat.time.hour + ":" + thread.schedule.repeat.time.minute, 'HH:mm').format('LT')} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DetailItem fieldKey="Days" value={repaetDays(thread.schedule.repeat.days)} />
                                                </Grid>
                                            </>
                                            : thread.type === 'interval' ?
                                                <>
                                                    <Grid item xs={6}>
                                                        <DetailItem fieldKey="Interval" value={thread.schedule.interval.interval + " mins"} />
                                                    </Grid>
                                                </>
                                                : thread.type === 'once' ?
                                                    <>
                                                        <Grid item xs={6}>
                                                            <DetailItem fieldKey="Day" value={moment(thread.schedule.once.dateTime).format('YYYY/DD/MM')} />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <DetailItem fieldKey="Time" value={moment(thread.schedule.once.dateTime).format('hh:mm')} />
                                                        </Grid>
                                                    </> :
                                                    <>
                                                    </>}
                                    </Grid>
                                </Box>

                            </CardContent>
                            <Box sx={{ flexGrow: 1 }} />
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Grid
                                        item
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        <AccessTimeIcon color="action" />
                                        <Typography
                                            color="textSecondary"
                                            display="inline"
                                            sx={{ pl: 1 }}
                                            variant="body2"
                                        >
                                            Updated {moment(thread.updatedAt).fromNow()}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        <GetAppIcon color="action" />
                                        <Typography
                                            color="textSecondary"
                                            display="inline"
                                            sx={{ pl: 1 }}
                                            variant="body2"
                                        >
                                            {15}
                                            {' '}
                                            Execution
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default ViewThread;