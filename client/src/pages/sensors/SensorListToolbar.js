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

const SensorListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      {/* <Button>
        Import
      </Button> */}
      <Button sx={{ mx: 1 }}
        component={RouterLink}
        variant="contained"
        to="/app/readings"
      >
        Readings
      </Button>
      <Button
        component={RouterLink}
        color="primary"
        variant="contained"
        to="/app/sensors/new"
      >
        Add sensor
      </Button>
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
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box> */}
  </Box>
);

export default SensorListToolbar;
