import {
    Link
} from 'react-router-dom';
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
import SensorParameters from './SensorParameters'
import getInitials from 'src/utils/getInitials';
import useFetch from 'src/hooks/useFetch';

const SensorDetail = ({ sensorDetail }) => {
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={sensorDetail?.avatar}
                        sx={{
                            height: 200,
                            width: 200,
                            fontSize: 100
                        }}
                    >
                        {getInitials(sensorDetail.id)}
                    </Avatar>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                    >
                        {sensorDetail.id}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        Id: {sensorDetail.id}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        Estimated readings: {sensorDetail.sensorReadings}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        Created: {moment(sensorDetail.createdAt).format('ddd/mm/yyyy hh:mm A')}
                    </Typography>
                    <SensorParameters parameters={sensorDetail.parameters} />
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    component={Link}
                    to={`/app/sensors/edit/${sensorDetail.id}`}
                >
                    edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default SensorDetail;
