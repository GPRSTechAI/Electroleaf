import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LogoutPrompt = ({ show, onClose, onSuccess }) => {
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            aria-describedby="alert-dialog-description"
            open={show}
            TransitionComponent={Transition}
        >
            <DialogTitle id="customized-dialog-title" onClose={onClose} color='white' sx={{ backgroundColor: 'background.danger' }} >
                Logout
            </DialogTitle >
            <DialogContent dividers>
                <DialogContentText gutterBottom align="center" sx={{ px: 5, py: 3 }}>
                    Are you sure
                    <br />
                    You want to log out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onSuccess} color='error'>
                    Logout
                </Button>
                <Button onClick={onClose} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogoutPrompt;