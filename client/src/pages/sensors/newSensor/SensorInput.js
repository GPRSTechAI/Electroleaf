import {
    Grid,
    TextField,
    IconButton
} from '@mui/material';
import { Trash2 as TrashIcon } from 'react-feather'

const SensorInput = ({ inputField, id, handleChange, handleRemoveField }) => {
    return <>
        <Grid
            item
            md={4}
            xs={12}
        >
            <TextField
                fullWidth
                label="Id"
                name="id"
                inputProps={
                    { readOnly: inputField._type === 'old' }
                }
                onChange={(e) => { handleChange(e, id) }}
                value={inputField.id || ''}
                variant="outlined"
            />
        </Grid>
        <Grid
            item
            md={4}
            xs={12}
        >
            <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={(e) => { handleChange(e, id) }}
                value={inputField.name || ''}
                variant="outlined"
            />
        </Grid>
        <Grid
            item
            md={3}
            xs={12}
        >
            <TextField
                fullWidth
                label="Unit"
                name="unit"
                onChange={(e) => { handleChange(e, id) }}
                value={inputField.unit || ''}
                variant="outlined"
            />
        </Grid>
        <Grid
            item
            md={1}
            xs={12}
        >
            <IconButton
                onClick={e => handleRemoveField(id)}
                style={{ color: 'red' }}
                aria-label="Remove"
                component="span"
                sx={{
                    pl: 0
                }}
                size="large">
                <TrashIcon />
            </IconButton>
        </Grid>
    </>;
}
export default SensorInput