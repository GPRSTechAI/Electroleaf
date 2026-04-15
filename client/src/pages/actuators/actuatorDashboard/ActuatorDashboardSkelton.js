import { Grid, Card, CardContent, Box, Avatar, Typography, Divider, Button, CardActions } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';

const ActuatorItem = () => {
    return (
        <Grid
            item
            lg={3}
            md={4}
            sm={6}
            xl={3}
            xs={12}
        >
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Skeleton
                            animation="wave"
                            variant="circular"
                            sx={{
                                width: '50%',
                                height: 'unset',
                                aspectRatio: '1 / 1',
                                fontSize: '4rem',
                                my: 1
                            }}
                        />
                        <Skeleton animation="wave" height={40} width="60%" sx={{ mt: 0.5 }} />
                        <Skeleton animation="wave" width="40%" sx={{ mt: 0.5 }} />
                        <Skeleton animation="wave" width="50%" sx={{ mt: 0.5 }} />
                        <Skeleton animation="wave" width="30%" sx={{ mt: 0.5 }} />
                    </Box>
                </CardContent>
                <Divider />
                <CardActions>
                    <Skeleton animation="wave" height={32} width="100%" />
                </CardActions>
            </Card>
        </Grid>
    );
}

const ActuatorDashbordSkelton = () => {
    return (
        <Grid
            container
            spacing={3}
            direction="row"
            my={1}
        >
            <ActuatorItem />
            <ActuatorItem />
        </Grid>
    );
}

export default ActuatorDashbordSkelton;