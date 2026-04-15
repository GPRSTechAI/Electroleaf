import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    CircularProgress
} from '@mui/material';
import Row from './Row';
import Confirmation from './Confirmation';

const CustomTable = (props) => {
    const {
        columns = [],
        itemsUrl,
        rows: items,
        loading,
        actions = {},
        customActions = [],
        expand,
        pagination = true,
        tableOnly,
        additionalData,
        refresh,
        totalRecords,
        paginationFetch = false,
        ...rest
    } = props;

    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [selectedrowIds, setSelectedrowIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [confirmation, setConfirmation] = useState({ title: null, message: null, show: false, onSuccess: null })

    const handleConfirmationClose = () => {
        setConfirmation({ ...confirmation, show: false, onSuccess: null })
    }

    const removerow = (item, additionalData, id, callback) => {
        const delApiURL = actions.delUrl(item, additionalData, id);
        fetch(process.env.REACT_APP_API_HOST + (delApiURL.startsWith('/') ? delApiURL : '/' + delApiURL), {
            method: 'DELETE',
        }).then(() => {
            callback()
            setRows(rows.filter(i => i !== item))
        })
            .catch(console.log)
    }

    const updateRow = (rowId, newRow) => {
        if (!newRow) {
            setRows(rows.filter((i, id) => id !== rowId))
        } else {
            const duplicate = [...rows]
            duplicate[rowId] = newRow
            setRows(duplicate)
        }
    }

    useEffect(() => {
        if (itemsUrl) {
            const abortCont = new AbortController();
            const pagination = paginationFetch ? `?offset=${limit * page}&limit=${limit}` : ""
            fetch(process.env.REACT_APP_API_HOST + itemsUrl + pagination, { signal: abortCont.signal })
                .then(res => {
                    if (res.status !== 200 && res.status !== 304) {
                        throw Error('could not fetch data')
                    }
                    return res.json()
                })
                .then(data => {
                    setRows(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        setIsLoading(false);
                        setError(err.message);
                    }
                });
            return () => abortCont.abort();
        }
    }, [itemsUrl, refresh, ...(paginationFetch ? [page, limit] : [])])

    // useEffect(() => {
    //     if (paginationFetch) {
    //         return fetchFromApi()
    //     }
    // }, [page, limit])

    useEffect(() => {
        if (!itemsUrl) {
            setRows(items)
        }
    }, [items])

    useEffect(() => {
        if (!itemsUrl) {
            setIsLoading(loading)
        }
    }, [loading])

    const handleSelectAll = (event) => {
        let newSelectedrowIds;

        if (event.target.checked) {
            newSelectedrowIds = rows.map((row) => row.id);
        } else {
            newSelectedrowIds = [];
        }

        setSelectedrowIds(newSelectedrowIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedrowIds.indexOf(id);
        let newSelectedrowIds = [];

        if (selectedIndex === -1) {
            newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds, id);
        } else if (selectedIndex === 0) {
            newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds.slice(1));
        } else if (selectedIndex === selectedrowIds.length - 1) {
            newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedrowIds = newSelectedrowIds.concat(
                selectedrowIds.slice(0, selectedIndex),
                selectedrowIds.slice(selectedIndex + 1)
            );
        }

        setSelectedrowIds(newSelectedrowIds);
    };

    const handleLimitChange = (event) => {
        setPage(0);
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // const badge = (field) =>{
    //   if(field===true){
    //     return <Badge badgeContent={'Active'} style={{marginLeft:"20px"}} color="success"/>;
    //   }
    //   if(field===false){
    //     return <Badge badgeContent={'Inactive'} style={{marginLeft:"20px"}} color="error"/>;
    //   }else{
    //     return field;
    //   }
    // };

    if (isLoading) return (

        <Box sx={{
            pt: 3,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignItems: 'center'
        }}>
            <CircularProgress color="primary" />
        </Box>
    )


    return (
        <Card>
            <PerfectScrollbar>
                <Box >
                    <Table {...rest}>
                        <TableHead>
                            <TableRow>
                                {expand &&
                                    <TableCell padding="checkbox" />
                                }
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedrowIds.length === rows.length}
                                        color="primary"
                                        indeterminate={
                                            selectedrowIds.length > 0
                                            && selectedrowIds.length < rows.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                {columns.map((column, id) => (
                                    <TableCell key={id}>
                                        {column.headerName}
                                    </TableCell>
                                ))}
                                {!!Object.keys(actions).length &&
                                    <TableCell align="center" sx={{ width: 50 }} />
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(paginationFetch ? rows : rows.slice(page * limit, page * limit + limit)).map((row, id) => (
                                <Row
                                    key={id}
                                    row={row}
                                    updateRow={updateRow}
                                    columns={columns}
                                    additionalData={additionalData}
                                    selectedrowIds={selectedrowIds}
                                    handleSelectOne={handleSelectOne}
                                    id={id}
                                    actions={actions}
                                    customActions={customActions}
                                    expand={expand}
                                    removerow={removerow}
                                    setConfirmation={setConfirmation}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            {pagination &&
                <TablePagination
                    component="div"
                    count={totalRecords || rows.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            }

            <Confirmation properties={confirmation} onClose={handleConfirmationClose} />
        </Card>
    );

    if (tableOnly) {
        return <TableComponent />
    } else {
        return (
            <Card {...rest}>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <TableComponent />
                    </Box>
                </PerfectScrollbar>
                <TablePagination
                    component="div"
                    count={rows.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        );
    };
}

Table.propTypes = {
    //columns: PropTypes.array.isRequired
};

export default CustomTable;