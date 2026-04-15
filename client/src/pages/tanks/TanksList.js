import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Avatar,
    Typography,
    Badge
} from '@mui/material';
import moment from 'moment';
import getInitials from 'src/utils/getInitials';
import CustomTable from 'src/components/CustomTable';
import TankListToolbar from './TankListToolbar';

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
                    src={i.id}
                    sx={{ mr: 2 }}
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
    { field: 'name', headerName: 'Name' },
    { field: 'unit', headerName: 'Unit' },
    { field: 'updatedAt', headerName: 'Created', render: (i, id) => moment(i.updatedAt).format('DD/MM/YYYY HH:MM') },
];

const TanksList = () => {
    return (
        <>
            <Helmet>
                <title>Tanks | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <TankListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <CustomTable
                            columns={columns}
                            itemsUrl='/tanks'
                            actions={{
                                editRoute: ({ id }) => `/app/tanks/edit/${id}`,
                                viewRoute: ({ id }) => `/app/tanks/${id}`,
                                delUrl: ({ id }) => `/tanks/${id}`
                            }}

                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default TanksList;
