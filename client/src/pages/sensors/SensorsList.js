import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Avatar,
    Typography
} from '@mui/material';
import SensorsListToolbar from './SensorListToolbar';
import CustomTable from 'src/components/CustomTable';
import getInitials from 'src/utils/getInitials';
import moment from 'moment';

import { Image as ImageIcon } from 'react-feather'

const columns = [
    {
        field: 'name', headerName: '', width: 20, render: (i, id) => (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Avatar
                    src={i.image?.url && `${i.image?.url}?tr=h-50%2Cw-50`}
                    sx={{ mr: 2 }}
                >
                    {getInitials(i.id)}
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
    { field: 'parameters', headerName: 'Parameters', render: (item) => item.parameters.length },
    { field: 'created', headerName: 'Created date', render: (i, id) => moment(i.createdAt).format('DD/MM/YYYY h:mm a') },
    { field: 'Updated', headerName: 'Updated date', render: (i, id) => moment(i.updatedAt).format('DD/MM/YYYY h:mm a') },
];
const innerTableColumns = [
    {
        field: 'name', headerName: '', width: 20, render: (i, id) => (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <Avatar
                    src={i.image?.url && `${i.image?.url}?tr=h-50%2Cw-50`}
                    sx={{ mr: 2 }}
                >
                    {getInitials(i.name)}
                </Avatar>
            </Box>
        )
    },
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'unit', headerName: 'Unit' },
    { field: 'created', headerName: 'Created date', render: (i, id) => moment(i.createdAt).format('DD/MM/YYYY h:mm a') },
];

const SensorsList = () => {
    return (
        <>
            <Helmet>
                <title>Sensors | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <SensorsListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <CustomTable
                            columns={columns}
                            itemsUrl='/sensors'
                            expand={{
                                field: "parameters",
                                columns: innerTableColumns,
                                heading: ({ id }) => `Sensor - ${id}`,
                                actions: {
                                    editRoute: ({ id: parameterId }, { id: sensorId }) => `edit/${sensorId}`,
                                    viewRoute: ({ id: parameterId }, { id: sensorId }) => `${sensorId}`,
                                    delUrl: ({ id: parameterId }, { id: sensorId }) => `/sensors/parameter/${sensorId}/${parameterId}`
                                },
                                customActions: [
                                    {
                                        label: () => "Image",
                                        to: (pm, { id }) => `image/${id}`,
                                        icon: () => <ImageIcon />,
                                    },
                                ]
                            }}
                            actions={{
                                editRoute: ({ id }) => `edit/${id}`,
                                viewRoute: ({ id }) => `${id}`,
                                delUrl: ({ id }) => `/sensors/sensor/${id}`,
                            }}
                            customActions={[
                                {
                                    label: () => "Image",
                                    to: ({ id }) => `image/${id}`,
                                    icon: () => <ImageIcon />,
                                },
                            ]}
                        />

                    </Box>
                </Container>
                {/* <TableComponent
                    title="Sensors"
                    columns={columns}
                    itemsUrl='/sensors'
                    dateFilter={false}
                    editRoute={({ id }) => `/app/sensors/edit/${id}`}
                    viewRoute={({ id }) => `/app/sensors/${id}`}
                    delUrl={({ id }) => `/sensors/${id}`}
                />
                <TableComponent
                    title="Parameters"
                    columns={columnsParameters}
                    itemsUrl='/sensors/allParameters'
                    dateFilter={false}
                    editRoute={({ sensorId }) => `/app/sensors/edit/${sensorId}`}
                    viewRoute={({ sensorId }) => `/app/sensors/${sensorId}`}
                    delUrl={({ sensorId, id }) => `/sensors/${sensorId}/${id}`}
                /> */}
            </Box>
        </>
    );
}

export default SensorsList;
