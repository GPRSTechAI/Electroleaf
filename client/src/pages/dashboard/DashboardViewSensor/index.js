import { useState } from 'react'
import {
    Grid,
    SwipeableDrawer,
    Typography,
    Skeleton,
    Box
} from '@mui/material';
import { grey } from '@mui/material/colors';
import ViewReading from './ViewReading';
import SensorImage from './SensorImage';

const drawerBleeding = 56;

const DashboardViewSensor = () => {
    return <ViewReading />
    return (
        <>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <ViewReading />
                </Grid>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                >
                    <SensorImage sx={{ height: '100%' }} />
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardViewSensor;