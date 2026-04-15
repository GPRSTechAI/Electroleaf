import {
    Box,
    Button
} from '@mui/material';


const ThresholdsToolbar = ({ onAddNewClick, ...props }) => (
    <Box {...props}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}
        >
            <Button
                color="primary"
                variant="contained"
                onClick={onAddNewClick}
            >
                Add Threshold
            </Button>
        </Box>
    </Box>
);

export default ThresholdsToolbar;
