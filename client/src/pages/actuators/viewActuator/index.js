import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid
} from '@mui/material';
import ActuatorDetail from './ActuatorDetail';
import ActuatorCommands from './ActuatorCommands';

const ViewActuator = () => {
    const { id } = useParams();

    return (
        <>
            <Helmet>
                <title>View Actuator | Electro Leaf</title>
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
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <ActuatorDetail id={id} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <ActuatorCommands id={id} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    );
}

export default ViewActuator;
