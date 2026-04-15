import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import moment from 'moment';
import CustomTable from 'src/components/CustomTable';
import NewReading from './NewReading'

const columns = [
    { field: 'time', headerName: 'Time', width: 150, render: (i, id) => moment(i.time).format('DD/MM/YYYY HH:mm:ss') },
    {
        field: '',
        headerName: 'Readings',
        width: 150,
        render: item => item.readings.reduce((final, selectedReading) => {
            const add = final ? ', ' : ''
            return final + add + selectedReading.value
        }, '')
    },
    { field: '', headerName: 'Count', width: 150, render: item => item.readings.length },
    { field: 'updatedAt', headerName: 'Updated', width: 90, render: (i, id) => moment(i.time).fromNow() }
];

const SensorReadings = ({ sensorDetail }) => {
    const { id } = useParams();
    const [selectedReading, setSelectedReading] = useState(null)

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const [items,setItems] =useState(null)
    const handleEdit = (item) => {
        // setItems(ite);
        // console.log(items)
        setSelectedReading(item)
        handleOpen()
    }

    const addManualReading = () => {
        // setSelectedReading({ time: '', sensorId: id, readings: sensorDetail.parameters.map(parameter => ({ parameterId: parameter.id, value: 0 })) })
        // setReadings([{
        //     parameter: '',
        //     value: ''
        // }])
        setSelectedReading(null)
        handleOpen()
    }

    const innerTableColumns = [
        { field: 'parameter', headerName: 'Parameter', width: 150, render: item => sensorDetail.parameters.find(parameter => parameter.id === item.parameterId).name },
        { field: 'parameterId', headerName: 'Parameter Id', width: 150 },
        { field: 'value', headerName: 'Value', width: 90 },
    ];

    return (
        <>
            <Card>
                <CardHeader
                    subheader="List of updated sensor readings"
                    title="Sensor Readings"
                />
                <Divider />
                <CardContent>
                    <Grid
                        spacing={3}
                    >
                        <CustomTable
                            totalRecords={sensorDetail.sensorReadings}
                            paginationFetch
                            columns={columns}
                            itemsUrl={'/sensorReadings/sensors/' + id}
                            onEditClick={handleEdit}
                            delUrl={({ id }) => `/sensorReadings/${id}`}
                            expand={{
                                field: "readings",
                                columns: innerTableColumns,
                                heading: ({ updatedAt }) => `Update at - ${moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}`,
                            }}
                            actions={{
                                onEditClick: handleEdit,
                                delUrl: ({ _id }) => `/sensorReadings/${_id}`
                            }}
                        />
                        {/* <TableComponent
                            columns={columns}
                            itemsUrl={'/sensorReadings/forSensor/' + id}
                            dateFilter={true}
                            onEditClick={handleEdit}
                            delUrl={(item) => `/sensorReadings/${item._id}`}
                            interval={5}
                        /> */}
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={addManualReading}
                    >
                        Add Reading
                    </Button>
                </Box>
            </Card>
            <NewReading
                sensorDetail={sensorDetail}
                readingId={selectedReading?._id}
                open={open}
                handleClose={handleClose}
            // items={items}
            />
        </>
    );
};

export default SensorReadings;
