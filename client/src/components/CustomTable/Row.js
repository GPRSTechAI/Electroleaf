import { useState } from 'react'
import {
    Checkbox,
    TableCell,
    TableRow,
    IconButton,
    Typography
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Action from 'src/components/CustomTable/Action'
import CustomTable from '.';

const Row = ({ row, updateRow, columns, selectedrowIds, handleSelectOne, id, actions, customActions, expand, additionalData, removerow, setConfirmation }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return <>
        <TableRow
            hover
            selected={selectedrowIds.indexOf(row.id) !== -1}
            sx={isExpanded ? { '& > *': { borderBottom: 'unset' } } : {}}
        >
            {expand &&
                <TableCell padding="checkbox" >
                    <IconButton onClick={() => setIsExpanded(!isExpanded)} size="large">
                        {isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </IconButton>
                </TableCell>
            }
            <TableCell padding="checkbox">
                <Checkbox
                    checked={selectedrowIds.indexOf(row.id) !== -1}
                    onChange={(event) => handleSelectOne(event, row.id)}
                    value="true"
                />
            </TableCell>
            {columns.map((column, id) => (
                <TableCell key={id} sx={column.width ? { width: column.width } : {}}>
                    {column.render
                        ? (
                            column.render(row, additionalData, id)
                        )
                        : (
                            row[column.field]
                        )
                    }
                </TableCell>
            ))}
            {!!Object.keys(actions).length &&
                <TableCell sx={{ py: 0 }}>
                    <Action
                        item={row}
                        updateRow={updateRow}
                        id={id}
                        actions={actions}
                        customActions={customActions}
                        additionalData={additionalData}
                        removerow={removerow}
                        setConfirmation={setConfirmation}
                    />
                </TableCell>
            }
        </TableRow>
        {isExpanded && (
            <TableRow>
                <TableCell colSpan={columns.length + 3}>
                    {expand.heading &&
                        <Typography variant="h6" gutterBottom component="div">
                            {expand.heading(row)}
                        </Typography>
                    }
                    <CustomTable
                        columns={expand.columns}
                        additionalData={row}
                        rows={row[expand.field]}
                        actions={expand.actions}
                        customActions={expand.customActions}
                        pagination={false}
                        size="small"
                    />
                </TableCell>
            </TableRow>
        )}
    </>;
}

export default Row;