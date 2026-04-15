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
import ActuatorListToolbar from '../ActuatorListToolbar';
//import customers from 'src/__mocks__/customers';
//import getInitials from 'src/utils/getInitials';
import CustomTable from 'src/components/CustomTable';
//import moment from 'moment';
//import useFetch from 'src/hooks/useFetch';

const columns = [
  { field: 'actuatorId', headerName: 'Actuator ID', width: 60 },
  { field: 'time', headerName: 'Time', width: 150 },
  { field: 'duration', headerName: 'Sending Message', width: 90 },
  { field: 'value', headerName: 'Receiving Message', width: 90 },
  { field: '_id', headerName: 'Object Id', width: 90 },
  { field: 'updatedAt', headerName: 'Created', width: 90, render: (i, id) => moment(i.createdAt).format('DD/MM/YYYY hh:mm:ss') },
  /* { field: 'currentValue', headerName: 'Current Value', width: 90 },*/
  //{ field: 'registrationDate', headerName: 'Registration date', width: 90, render: (i, id) => moment(i.createdAt).format('DD/MM/YYYY') },
];

const AllActuatorCommands = () => {
  return (
    <>
      <Helmet>
        <title>Actuator Commands | Electro Leaf</title>
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
          <Box sx={{ pt: 3 }}>
            <CustomTable
              columns={columns}
              itemsUrl='/actuatorCommands'
              editRoute={({ actuatorId }) => `/app/actuators/${actuatorId}`}
              delUrl={({ id }) => `/actuatorCommands/forActuator/${id}`}

            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default AllActuatorCommands;
