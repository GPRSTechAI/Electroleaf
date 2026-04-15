import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    Typography
} from '@mui/material';
import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon,
    Cpu as CpuIcon,
    Activity as ActivityIcon,
    Command as CommandIcon,
    Clock as ClockIcon,
    Database as DatabaseIcon,
    FileText as FileTextIcon
} from 'react-feather';
import NavItem from './NavItem';
import { MHidden } from "src/components/@material-extend";
import { useAuth } from 'src/context/AuthContext';

const items = [
    {
        href: '/app/dashboard',
        icon: BarChartIcon,
        title: 'Dashboard'
    },
    {
        href: '/app/sensors',
        icon: CpuIcon,
        title: 'Sensors'
    },
    // {
    //     href: '/app/readings',
    //     icon: ActivityIcon,
    //     title: 'Readings'
    // },
    {
        href: '/app/actuators',
        icon: CommandIcon,
        title: 'Actuators'
    },
    {
        href: '/app/tanks',
        icon: DatabaseIcon,
        title: 'Tanks'
    },
    {
        href: '/app/threads',
        icon: ClockIcon,
        title: 'Threads'
    },
    {
        href: '/app/constants',
        icon: FileTextIcon,
        title: 'Thresholds'
    },
    {
        href: '/app/users',
        icon: UsersIcon,
        title: 'Users'
    },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const location = useLocation();
    const { user, farmDetail } = useAuth()
    user.avatar = '/static/images/avatars/default-avatar.jpg'

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2
                }}
            >
                <Avatar
                    component={RouterLink}
                    src={process.env.REACT_APP_API_HOST + "/farm/logo"}
                    sx={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64,
                        mb: 2
                    }}
                    to="/account"
                />
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    {farmDetail.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.firstname + " " + user.lastname}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
        </Box>
    );

    return <>
        <MHidden width="mdUp">
            <Drawer
                anchor="left"
                onClose={onMobileClose}
                open={openMobile}
                variant="temporary"
                PaperProps={{
                    sx: {
                        width: 256
                    }
                }}
            >
                {content}
            </Drawer>
        </MHidden>
        <MHidden width="mdDown">
            <Drawer
                anchor="left"
                open
                variant="persistent"
                PaperProps={{
                    sx: {
                        width: 256,
                        top: 64,
                        height: 'calc(100% - 64px)'
                    }
                }}
            >
                {content}
            </Drawer>
        </MHidden>
    </>;
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
    onMobileClose: () => { },
    openMobile: false
};

export default DashboardSidebar;
