import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    useTheme,
    colors
} from '@mui/material';
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import moment from 'moment';
import MoneyIcon from '@mui/icons-material/Money';
import { red, green } from '@mui/material/colors';
import TankProgressBar from './TankProgressBar';

const TankReading = ({ name, id, unit, reading, ...props }) => {
    const timeDiffer = moment(reading.time).fromNow() || '';
    const color = reading.value >= 30 ? green[600] : red[900];
    return (
        <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
        >
            <Card
                sx={{ height: '100%' }}
            >
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Grid
                            item
                            maxWidth='50%'
                        >
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="h6"
                            >
                                {name}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="h6"
                            >
                                {id}
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h3"
                            >
                                {reading.value} {unit}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            maxWidth='50%'
                        >
                            <TankProgressBar value={reading.value} />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            pt: 2,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            variant="caption"
                        >
                            {timeDiffer}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default TankReading;
