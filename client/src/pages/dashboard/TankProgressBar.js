import {
    Box,
    Grid
} from '@mui/material';
import { styled } from '@mui/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "80px !important",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const TankProgressBar = ({ value }) => {
    return (

        <Grid
            container
            direction="row"
            sx={{ minWidth: 120, transform: 'rotate(-90deg)' }}
        >
            <Grid item>
                <Box sx={{ flexGrow: 1, minWidth: 100 }}>
                    <BorderLinearProgress variant="determinate" value={value} />
                </Box>
            </Grid>
            <Grid item sx={{ alignSelf: 'center' }}>
                <div style={{ width: 10, height: 40, backgroundColor: "#ddd", borderRadius: "0 10px 10px 0" }} />
            </Grid>
        </Grid>
    );
}

export default TankProgressBar;