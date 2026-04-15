import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputIcon from '@mui/icons-material/Input';
import Logo from './Logo';
import DashboardAccount from './DashboardAccount';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar sx={{ bgcolor: 'navbar.main' }}>
        <Hidden mdDown>
          <RouterLink to="/" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Logo />
          </RouterLink>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }} >
          <Hidden mdUp>
            <RouterLink to="/" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <Logo />
            </RouterLink>
          </Hidden>
        </Box>
        <Hidden mdDown>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={0} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large" sx={{ mr: 1 }}>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Hidden>
        <DashboardAccount />
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
