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

const UserListToolbar = (props) => (
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
                to="/app/users/new"
            >
                Add User
            </Button>
        </Box>
    </Box>
);

export default UserListToolbar;
