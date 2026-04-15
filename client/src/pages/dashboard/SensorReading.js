import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Stack,
    Tooltip
} from '@mui/material';
import { styled } from "@mui/material/styles";
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import moment from 'moment';
import MoneyIcon from '@mui/icons-material/Money';
import { red, green } from '@mui/material/colors';
import MiniChart from './MiniChart';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const OnlineStatus = styled('span')(({ theme, online }) => ({
    height: '10px',
    aspectRatio: '1 / 1',
    margin: 'auto',
    marginRight: 0,
    borderRadius: '50%',
    backgroundColor: online ? theme.palette.primary.main : theme.palette.error.light,
    animation: 'blinker 2s linear infinite',
    "@keyframes blinker": {
        "50%": {
            opacity: 0
        }
    },
}));

const SensorReading = ({ name, id, unit, readings = [], lastReading, ...props }) => {
    const readingDiffer = Number(((readings[0] || 0) - (readings[1] || 0)).toFixed(2));
    const timeDiffer = lastReading ? moment(lastReading).fromNow() : '';
    const color = readingDiffer >= 0 ? green[600] : red[900];
    const online = (Date.now() - lastReading) < 25 * 60 * 1000
    return (
        <Card
            sx={{ height: '100%' }}
        >
            <CardContent sx={(theme) => ({ p: `${theme.spacing(2)} !important` })}>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid
                        item
                        maxWidth='50%'
                    >
                        <Tooltip title={`Name: ${name}, id: ${id}`}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="h6"
                            >
                                {name || '[No name]'}
                            </Typography>
                        </Tooltip>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            {readings[0]} {unit}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        maxWidth='50%'
                    >
                        <MiniChart
                            readings={readings}
                            name={name}
                        />
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {readingDiffer >= 0
                        ? <ArrowUpwardIcon sx={{ color: green[900] }} />
                        : <ArrowDownwardIcon sx={{ color: red[900] }} />
                    }
                    <Typography
                        sx={{
                            color,
                            mr: 1,
                            maxWidth: "40%"
                        }}
                        variant="body2"
                        noWrap={true}
                    >
                        {Math.abs(readingDiffer)} {unit}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        {timeDiffer}
                    </Typography>
                    {/* <FiberManualRecordIcon color={online ? "primary" : "error"} fontSize='small' sx={{ margin: 'auto', mr: 0 }} /> */}
                    <Tooltip title={online ? "Online" : "Offline"}>

                        <OnlineStatus online={online} />
                    </Tooltip>
                </Box>
            </CardContent>
        </Card>
    );
}

export default SensorReading;
