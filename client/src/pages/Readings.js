import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Box,
    Card,
    Container
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import moment from 'moment';
import useFetch from 'src/hooks/useFetch';

const columns = [
    { field: 'sensorId', title: 'Sensor ID', width: 150 },
    { field: 'parameterId', title: 'Parameter ID', width: 150 },
    { field: 'time', title: 'Time', width: 150, render: (i, id) => moment(i.time).format('DD/MM/YYYY HH:mm:ss') },
    { field: 'board', title: 'Board', width: 150 },
    { field: 'parameter', title: 'Parameter', width: 150 },
    { field: 'value', title: 'Value', width: 90 }
];

const Readings = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (limit) => {
        setPage(0);
        setLimit(limit);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const [data, isLoading] = useFetch(`/sensorReadings?forTable=1&limit=${limit}&offset=${page * limit}`)
    const [totalCount, isTotalLoading] = useFetch(`/sensorReadings/totalCount`)
    return (
        <>
            <Helmet>
                <title>Sensor Readings | Electro Leaf</title>
            </Helmet>


            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Card>
                        <PerfectScrollbar>
                            <Box >
                                <MaterialTable
                                    title="Sensor Readings"
                                    columns={columns}
                                    data={data}
                                    options={{
                                        filtering: true,
                                        exportMenu: [{
                                            label: 'Export PDF',
                                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'sensor readings')
                                        }, {
                                            label: 'Export CSV',
                                            exportFunc: (cols, datas) => {
                                                console.log(cols, datas)
                                                return ExportCsv(cols, datas, 'sensor readings')
                                            }
                                        }],
                                        cellStyle: {
                                            fontFamily: '"Roboto","Helvetica","Arial",sans-serif;',
                                            fontWeight: 400,
                                            fontSize: '0.875rem',
                                            padding: '8px',
                                            paddingLeft: '24px'
                                        },
                                        filterCellStyle: {
                                            padding: '8px',
                                        },
                                        pageSizeOptions: [10, 25, 50, 100, { value: totalCount.count, label: 'All' }],
                                        pageSize: limit,
                                    }}
                                    page={page}
                                    totalCount={totalCount.count}
                                    isLoading={isLoading || isTotalLoading}
                                    onRowsPerPageChange={handleLimitChange}
                                    onPageChange={handlePageChange}
                                />
                            </Box>
                        </PerfectScrollbar>
                    </Card>
                </Container>
            </Box>


        </>
    );
}

export default Readings;