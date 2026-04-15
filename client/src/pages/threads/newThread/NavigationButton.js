import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Grid,
    TextField,
    Button,
    Tabs,
    Tab,
    Typography,
    Divider
} from '@mui/material';

const NavigationButton = ({ previous, next }) => {
    const { tab } = useParams();
    const navigate = useNavigate()

    const handleClickMove = (to) => {
        navigate(location.pathname.replace(tab, to))
    }
    return (
        <>
            <Divider sx={{
                marginTop: 2,
            }} />
            <Grid
                container
            >
                {previous &&
                    <Grid
                        mt={1}
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                        md={next ? 6 : 12}
                        xs={12}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleClickMove(previous)}
                        >
                            Previous
                        </Button>
                    </Grid>
                }
                {next &&
                    <Grid
                        mt={1}
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                        md={previous ? 6 : 12}
                        xs={12}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleClickMove(next)}
                        >
                            Next
                        </Button>
                    </Grid>
                }

            </Grid>
        </>
    );
}

export default NavigationButton;