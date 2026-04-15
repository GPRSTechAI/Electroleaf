import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Button,
    Typography
} from '@mui/material';
import SensorReading from "./SensorReading";
import useIntervalFetch from 'src/hooks/useIntervalFetch';

const Sensors = ({ sensor, sensorReadings = [] }) => {
    // const [sensorReadings] = useIntervalFetch('/sensorReadings/sensors/' + sensor.id, 15000);
    return (
        <>
            <Link to={sensor.id}>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="small"
                    sx={{
                        mb: 1,
                        textTransform: 'none'
                    }}
                >
                    {sensor.id}
                </Button>
            </Link>
            <Grid
                container
                spacing={3}
                direction="row"
                mb={3}
            >
                {sensor.parameters.map((parameter, id) => {
                    // const readings = sensorReadings.map(sensorReading => {
                    //     return sensorReading.readings.find(reading => reading.parameterId === parameter.id)?.value
                    // })
                    return (
                        <Grid
                            key={parameter.id + sensor.id + id}
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <Link to={sensor.id + '/' + parameter.id} >
                                <SensorReading {...parameter} readings={sensorReadings[parameter.id]?.readings} lastReading={sensorReadings[parameter.id]?.lastReading} />
                            </Link>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}

export default Sensors;