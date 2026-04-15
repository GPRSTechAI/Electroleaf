import { useState, Fragment } from 'react'
import { NavLink } from "react-router-dom";
import {
    Box,
    Container,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText
} from '@mui/material';


import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewIcon from '@mui/icons-material/AutoStories';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ITEM_HEIGHT = 48;

const Action = ({ item, updateRow, id, actions: { viewRoute, editRoute, onViewClick, onDelClick, onEditClick }, removerow, customActions, additionalData, setConfirmation }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelClick = () => {
        handleClose()
        setConfirmation({
            title: "Confirm the Deletion", message: "Are you sure, you want to remove the row permanently?", show: true, onSuccess: () => {
                removerow(item, additionalData, id, () => {
                    setConfirmation(confirmation => ({ ...confirmation, show: false, onSuccess: null }))
                })
            }
        })
    }

    const handleCustomActionClick = (action, actionId) => {
        if (action.to) return
        const localUpdateRow = row => {
            handleClose()
            updateRow(id, row)
        }
        if (action.confirmation) {
            setConfirmation({
                ...action.confirmation, show: true, onSuccess: () => {
                    action.onClick(item, id, (row) => {
                        setConfirmation({ title: null, message: null, show: false, onSuccess: null })
                        localUpdateRow(row)
                    })
                }
            })
        } else {
            action.onClick(item, id, localUpdateRow)
        }

    }

    return <>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls="long-menu"
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            size="large">
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
                'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    border: 0
                },
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        >

            {/* <MenuItem selected={false} onClick={handleClose}>
                {option}
            </MenuItem> */}
            {viewRoute &&
                [
                    <NavLink key="0-0" style={{ cursor: 'pointer', color: 'unset' }} to={viewRoute(item, additionalData, id)}>
                        <MenuItem>
                            <ViewIcon sx={{ height: 20, mr: 2 }} /> View
                        </MenuItem>
                    </NavLink>,
                    <Divider key="1-0" />
                ]
            }{onViewClick &&
                [
                    <MenuItem key="2-0" onClick={() => { handleClose(); onViewClick(item, id) }}>
                        <ViewIcon sx={{ height: 20, mr: 2 }} /> View
                    </MenuItem>,
                    <Divider key="3-0" />
                ]
            }
            {editRoute &&
                [
                    <NavLink key="4-0" style={{ cursor: 'pointer', color: 'unset' }} to={editRoute(item, additionalData, id)}>
                        <MenuItem>
                            <EditIcon sx={{ height: 20, mr: 2 }} /> Edit
                        </MenuItem>
                    </NavLink>,
                    <Divider key="5-0" />
                ]
            }{onEditClick &&
                [
                    <MenuItem key="6-0" onClick={() => { handleClose(); onEditClick(item, additionalData, id) }}>
                        <EditIcon sx={{ height: 20, mr: 2 }} /> Edit
                    </MenuItem>,
                    <Divider key="7-0" sx={{ mt: '0 !important', mb: '0 !important' }} />
                ]
            }
            <MenuItem onClick={() => handleDelClick()}>
                <DeleteIcon sx={{ height: 20, mr: 2 }} /> Delete
            </MenuItem>
            {customActions.map((action, id) => {
                const renderedMenuItem = <MenuItem key={id + 1} onClick={() => handleCustomActionClick(action, id)}>
                    <ListItemIcon sx={{ mr: 0.5 }}>
                        {/* <Icon icon={action.icon(item, additionalData, id) || 'carbon:status-change'} width={20} height={20} /> */}
                        {action.icon(item, additionalData, id)}
                    </ListItemIcon>
                    <ListItemText primary={action.label(item, additionalData, id)} primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>

                return (
                    [

                        <Divider key={id + 0} sx={{ mt: '0 !important', mb: '0 !important' }} />,
                        action.to ? <NavLink key={id + 1} style={{ cursor: 'pointer', color: 'unset' }} to={action.to(item, additionalData, id)}>
                            {renderedMenuItem}
                        </NavLink>
                            : renderedMenuItem
                    ]
                )
            })}
        </Menu>
    </>;
}

export default Action;