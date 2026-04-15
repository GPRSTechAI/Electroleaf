import {
    NavLink as RouterLink
} from 'react-router-dom';

import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
} from '@mui/material';
import { Search as SearchIcon } from 'react-feather';

const ActuatorListToolbar = (props) => (
    <Box {...props}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}
        >
            {/* <Button>
          Import
        </Button>
        <Button sx={{ mx: 1 }}>
          Export
        </Button> */}
            <Button
                component={RouterLink}
                color="primary"
                variant="contained"
                to="/app/actuators/new"
            >
                Add Actuators
            </Button>
            {/* <Button
                sx={{ mx: 1 }}
                component={RouterLink}
                color="primary"
                variant="contained"
                to="/app/commands"
            >
                All Commands
            </Button> */}
        </Box>
        {/* <Box sx={{ mt: 3 }}>
            <Card>
                <CardContent>
                    <Box sx={{ maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SvgIcon
                                            fontSize="small"
                                            color="action"
                                        >
                                            <SearchIcon />
                                        </SvgIcon>
                                    </InputAdornment>
                                )
                            }}
                            placeholder="Search Fogger"
                            variant="outlined"
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box> */}
    </Box>
);

export default ActuatorListToolbar;
