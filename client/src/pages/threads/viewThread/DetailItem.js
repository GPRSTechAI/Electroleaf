import {
    Typography,
    Grid,
    Box
} from '@mui/material';

const DetailItem = ({ fieldKey, value }) => {
    return (
        <Box

            sx={{
                pt: 1,
                boxShadow: 1
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography sx={{ mx: 2, my: 1 }}>{fieldKey}</Typography>
                </Grid>
                <Grid item xs={6}>
                    {typeof value === 'string' ? <Typography>{value}</Typography> : value}
                </Grid>
            </Grid>
        </Box>
    );
}

export default DetailItem;