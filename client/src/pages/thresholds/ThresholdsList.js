import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Chip
} from '@mui/material';
import moment from 'moment';
import getInitials from 'src/utils/getInitials';
import CustomTable from 'src/components/CustomTable';
import TankListToolbar from './ThresholdsToolbar';
import AddThreshold from './addThreshold';

const columns = [
    { field: 'key', headerName: 'Key' },
    { field: 'value', headerName: 'Value' },
    {
        field: 'status', headerName: 'Status', render: i => (
            <Chip
                color={i.status ? "primary" : "error"}
                label={i.status ? 'Active' : 'Inactive'}
                size="small"
            />
        )
    },
    {
        field: 'published', headerName: 'Published', render: i =>
            <Chip
                color={i.published ? "primary" : "secondary"}
                label={i.published ? 'Published' : 'Pending'}
                size="small"
            />
    },
    { field: 'updatedAt', headerName: 'Last Updated', render: (i, id) => moment(i.updatedAt).format('DD/MM/YYYY HH:MM') },
];

const ThresholdsList = () => {
    const [addNew, setAddNew] = useState(false)
    const [values, setVaues] = useState({ key: '', value: '', status: true })
    const [id, setId] = useState()
    const [refresh, setRefresh] = useState(false)

    const handleClose = () => {
        setAddNew(false)
    }

    const handleAddNew = () => {
        setId(null)
        setVaues({ key: '', value: '', status: true })
        setAddNew(true)
    }

    const afterSubmit = () => {
        setRefresh(!refresh)
    }

    const handleEditClick = ({ _id, key, value, status }) => {
        setId(_id)
        setVaues({ key, value, status })
        setAddNew(true)
    }

    return (
        <>
            <Helmet>
                <title>Constatns | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <TankListToolbar onAddNewClick={handleAddNew} />
                    <Box sx={{ pt: 3 }}>
                        <CustomTable
                            columns={columns}
                            itemsUrl='/thresholds'
                            actions={{
                                onEditClick: handleEditClick,
                                delUrl: ({ _id }) => `/thresholds/${_id}`
                            }}
                            refresh={refresh}
                        />
                    </Box>
                </Container>
            </Box>
            <AddThreshold show={addNew} id={id} onClose={handleClose} values={values} setValues={setVaues} afterSubmit={afterSubmit} />
        </>
    );
}

export default ThresholdsList;
