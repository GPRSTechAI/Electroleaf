import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid
} from '@mui/material';
import SensorDetail from './SensorDetail';
import SensorReadings from './SensorReadings';
import SensorImages from './SensorImages';
import useFetch from 'src/hooks/useFetch';

const ViewSensor = () => {
    const { id } = useParams();
    const [sensorDetail] = useFetch('/sensors/find/' + id)
    return (
        <>
            <Helmet>
                <title>View Sensor | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            container
                            spacing={3}
                            direction="column"
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <Grid
                                item
                            >
                                <SensorDetail sensorDetail={sensorDetail} />
                            </Grid>
                            <Grid
                                item
                            >
                                {/* <SensorImages sensorDetail={sensorDetail} /> */}
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <SensorReadings sensorDetail={sensorDetail} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    );
}

export default ViewSensor;
