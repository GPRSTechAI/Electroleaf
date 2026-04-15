import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Avatar,
    Typography,
    Chip
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import XIcon from '@mui/icons-material/Close';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

import moment from 'moment';
import getInitials from 'src/utils/getInitials';
import CustomTable from 'src/components/CustomTable';
import UserListToolbar from './UserListToolbar';

const columns = [
    {
        field: 'name', headerName: 'Name', width: 150, render: (i, id) => (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Avatar
                    src={i.id}
                    sx={{ mr: 2 }}
                >
                    {getInitials(i.firstname + " " + i.lastname)}
                </Avatar>
                <Typography
                    color="textPrimary"
                    variant="body1"
                >
                    {i.firstname + " " + i.lastname}
                </Typography>
            </Box>
        )
    },
    { field: 'email', headerName: 'Email', width: 60 },
    { field: 'admin', headerName: 'Admin', width: 60, render: (i, id) => <Chip sx={{ width: '100%' }} label={i.isAdmin ? "Admin" : "No"} color={i.isAdmin ? "primary" : "secondary"} /> },
    { field: 'createdAt', headerName: 'Created', width: 90, render: (i, id) => moment(i.createdAt).format('DD/MM/YYYY HH:MM') },
];

const UsersList = () => {
    return (
        <>
            <Helmet>
                <title>Users | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <UserListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <CustomTable
                            columns={columns}
                            itemsUrl='/users'
                            actions={{
                                editRoute: ({ id }) => `edit/${id}`,
                                viewRoute: ({ id }) => `${id}`,
                                delUrl: ({ id, isAdmin }) => isAdmin && `/users/${id}`
                            }}
                            customActions={[
                                {
                                    label: ({ loginEnabled }) => loginEnabled ? "Ban login" : "Allow login",
                                    onClick: () => { },
                                    icon: ({ loginEnabled }) => loginEnabled ? <XIcon /> : <CheckIcon />,
                                    confirmation: {
                                        title: 'Confirm user login',
                                        message: 'Confrim changing user log in status'
                                    }
                                },
                                {
                                    label: () => "Edit privileges",
                                    to: ({ id }) => `privileges/${id}`,
                                    icon: () => <PlaylistAddCheckIcon />
                                },
                            ]}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default UsersList;
