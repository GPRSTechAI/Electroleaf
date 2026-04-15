import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid,
    Button,
    LinearProgress
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Sensors from './Sensors'
import SensorSkeleton from './SensorsSkeleton';
import TankReading from './TankReading';
import useFetch from 'src/hooks/useFetch';
import useIntervalFetch from 'src/hooks/useIntervalFetch';

const interval = 10000;
const progressFrequent = 50         // Do not set the value to 0

const Dashboard = () => {
    const [selectedBoard, setSelectedBoard] = useState(null)
    const [boards, boardsLoading, boardsError] = useFetch('/sensors/boards');
    const [sensors, sensorsLoading] = useFetch(selectedBoard && '/sensors/boards/' + selectedBoard);
    const [sensorReadings] = useIntervalFetch(selectedBoard && selectedBoard !== 'tank' && '/sensorReadings/dashboard/board/' + selectedBoard, interval);
    const [tanks] = useIntervalFetch(selectedBoard && selectedBoard === 'tank' && '/tanks', interval)
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate()

    const handleClick = (board) => {
        setSelectedBoard(board)
        navigate('')
    }

    useEffect(() => {
        if (!boards.length) return
        // setSelectedBoard(boards[0])
        setSelectedBoard(boards[0] || "tank")
    }, [boards])

    useEffect(() => {
        setProgress(100)
        const timer = setInterval(() => {
            setProgress(0);
        }, 1000);

        // const timer = setInterval(() => {
        //     setProgress((oldProgress) => {
        //         return oldProgress + (100 / progressFrequent)
        //     });
        // }, interval / progressFrequent);

        return () => {
            clearInterval(timer);
        };
    }, [sensorReadings, tanks])

    return (
        <>
            <Helmet>
                <title>Dashboard | Electro Leaf</title>
            </Helmet>
            <LinearProgress variant="determinate" value={progress} />
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>

                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        mb={3}
                    >
                        {boardsLoading && <>
                            <Grid
                                item
                            >
                                <Skeleton variant="rectangular" width={80} height={36.5} />
                            </Grid>
                            <Grid
                                item
                            >
                                <Skeleton variant="rectangular" width={80} height={36.5} />
                            </Grid>
                        </>}
                        {boards.map((board, id) => (
                            <Grid
                                key={id}
                                item
                            >
                                <Button variant={selectedBoard === board ? "contained" : "outlined"} style={{ textTransform: 'none' }} onClick={() => handleClick(board)}>{board}</Button>
                            </Grid>

                        ))}
                        <Grid
                            item
                        >
                            <Button color="secondary" variant={selectedBoard === "tank" ? "contained" : "outlined"} style={{ textTransform: 'none' }} onClick={() => handleClick("tank")}>Tank</Button>
                        </Grid>
                    </Grid>

                    {boardsError && <Alert severity="error" sx={{ mb: 1 }}>{boardsError}</Alert>}

                    {selectedBoard === "tank"
                        ?
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            mb={3}
                        >
                            {tanks.map((tank, id) => (
                                <TankReading key={"tank-" + id} {...tank} />
                            ))}
                        </Grid>
                        :
                        <>
                            {sensorsLoading && <SensorSkeleton />}
                            {
                                sensors.map((sensor, id) => (
                                    <Sensors
                                        sensor={sensor}
                                        key={sensor.id + id}
                                        sensorReadings={sensorReadings[sensor.id]}
                                    />
                                ))
                            }
                        </>
                    }

                    <Outlet />

                </Container>
            </Box>
        </>
    );
}

export default Dashboard;
