import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Avatar,
    Typography,
    Badge
} from '@mui/material';
import moment from 'moment';
//import SensorsListResults from 'src/components/sensors/SensorsListResults';
import ActuatorListToolbar from './ActuatorListToolbar';
//import customers from 'src/__mocks__/customers';
import getInitials from 'src/utils/getInitials';
import CustomTable from 'src/components/CustomTable';
import ActuatorDashboard from './actuatorDashboard/ActuatorDashboard';
//import moment from 'moment';
//import useFetch from 'src/hooks/useFetch';

const columns = [
    {
        field: 'name', headerName: 'Name', render: (i, id) => (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Avatar
                    sx={{ mr: 2 }}
                    src={i.image?.url && `${i.image?.url}?tr=h-50%2Cw-50`}
                >
                    {getInitials(i.name)}
                </Avatar>
                <Typography
                    color="textPrimary"
                    variant="body1"
                >
                    {i.name}
                </Typography>
            </Box>
        )
    },
    { field: 'id', headerName: 'ID' },
    { field: 'board', headerName: 'Board' },
    { field: 'updatedAt', headerName: 'Created', render: (i, id) => moment(i.updatedAt).format('DD/MM/YYYY HH:MM') },
    /* { field: 'currentValue', headerName: 'Current Value', width: 90 },*/
    //{ field: 'registrationDate', headerName: 'Registration date', width: 90, render: (i, id) => moment(i.createdAt).format('DD/MM/YYYY') },
];

const ActuatorList = () => {
    return (
        <>
            <Helmet>
                <title>Actuators | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <ActuatorListToolbar />
                    <ActuatorDashboard />
                    <Box sx={{ pt: 3 }}>
                        <CustomTable
                            columns={columns}
                            itemsUrl='/actuators'
                            actions={{
                                editRoute: ({ id }) => `/app/actuators/edit/${id}`,
                                viewRoute: ({ id }) => `/app/actuators/${id}`,
                                delUrl: ({ id }) => `/actuators/${id}`
                            }}

                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default ActuatorList;
