import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirmation({ properties: { title = "Confirm", show, message = "", onSuccess }, onClose }) {
    return (
        <div>
            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                aria-describedby="alert-dialog-description"
                open={show}
                TransitionComponent={Transition}
            >
                <DialogTitle id="customized-dialog-title" onClose={onClose} color='white' sx={{ backgroundColor: 'background.danger' }} >
                    {title}
                </DialogTitle >
                <DialogContent dividers>
                    <DialogContentText gutterBottom align="center" sx={{ px: 5, py: 3 }}>
                        Are you sure?
                        <br />
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onSuccess} color='primary'>
                        Confirm
                    </Button>
                    <Button onClick={onClose} color='error'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
