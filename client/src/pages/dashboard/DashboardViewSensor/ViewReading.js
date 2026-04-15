import { useState } from 'react';
import { useParams } from 'react-router';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    colors,
    Menu,
    MenuItem,
    Fade,
    TextField,
    Grid,
    TablePagination
} from '@mui/material';
import moment from 'moment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import useFetch from 'src/hooks/useFetch';
import Chart from './Chart';

import './viewReading.css'

const options = [
    'Realtime',
    'Filter',
    'Go Live',
    'Fit Screen',
];

const ViewReading = (props) => {
    const { sensorId, parameterId } = useParams();
    const [sensorDetail] = useFetch('/sensors/find/' + sensorId);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMode, setSelectedMode] = useState(0);
    const [selection, setSelection] = useState({ from: moment(Date.now() - 600000).format('YYYY-MM-DDTHH:mm'), to: moment([]).format('YYYY-MM-DDTHH:mm') })

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOption = id => {
        handleClose();
        switch (id) {
            case 0:
                setSelectedMode(0)
                break;
            case 1:
                setSelectedMode(1)
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    const handleSelectionChange = (event) => {
        setSelection({
            ...selection,
            [event.target.name]: event.target.value
        });
        setPage(0);
    };

    const handleLimitChange = (event) => {
        setPage(0);
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...props}>
            <CardHeader
                // action={(
                //     <>
                //         <Button
                //             endIcon={<ArrowDropDownIcon />}
                //             size="small"
                //             variant="text"
                //             onClick={handleClick}
                //         >
                //             {options[selectedMode]}
                //         </Button>
                //         <Menu
                //             getContentAnchorEl={null}
                //             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                //             transformOrigin={{ vertical: "top", horizontal: "center" }}
                //             anchorEl={anchorEl}
                //             keepMounted
                //             open={Boolean(anchorEl)}
                //             onClose={handleClose}
                //         >
                //             {options.map((option, id) => (
                //                 <MenuItem key={id} onClick={() => handleClickOption(id)}>{option}</MenuItem>
                //             ))}
                //         </Menu>
                //     </>
                // )}
                title={sensorDetail?.id}
            // subheader={`Total Readings - ${sensorDetail.sensorReadings}`}
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
                <TablePagination
                    component="div"
                    count={sensorDetail.sensorReadings || 0}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    showFirstButton
                    labelRowsPerPage="Readings per page"
                    sx={{ flexDirection: 'row-reverse' }}
                    classes={{
                        actions: 'dashboard-viewreding'
                    }}
                />
            </CardContent>
            <Divider />

            {selectedMode === 1 &&
                <>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={5}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Time from"
                                    name="from"
                                    onChange={handleSelectionChange}
                                    required
                                    type="datetime-local"
                                    value={selection.from}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                md={5}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Time to"
                                    name="to"
                                    onChange={handleSelectionChange}
                                    required
                                    type="datetime-local"
                                    value={selection.to}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            {/* <Grid
                item
                md={2}
                xs={12}
              >
                <Button
                  endIcon={<ArrowRightIcon />}
                  size="large"
                  variant="outlined"
                // onClick={handleClick}
                >
                  Go
                </Button>
              </Grid> */}
                        </Grid>
                    </CardContent>
                    <Divider />
                </>
            }

            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                    <Chart
                        sensorId={sensorId}
                        parameterId={parameterId}
                        page={page}
                        limit={limit}
                        from={selectedMode === 1 && moment(selection.from).valueOf()}
                        to={selectedMode === 1 && moment(selection.to).valueOf()}
                    />
                </Box>
            </CardContent>
            <Divider />
            {/* <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    variant="text"
                >
                    Overview
                </Button>
            </Box> */}
        </Card>
    );
};

export default ViewReading;
