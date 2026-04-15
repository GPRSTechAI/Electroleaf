import { useState, useEffect, forwardRef } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Form from 'src/components/form/Form';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const ModalBox = ({ children }) => (
    <Box sx={{ display: 'flex', minWidth: 300, minHeight: 150, alignItems: 'center' }}>
        {children}
    </Box>
)

export default function AddThreshold({ id, values, setValues, show, onClose, afterSubmit }) {
    // const [idError, setIdError] = useState(false);
    // const [nameError, setNameError] = useState(false);
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleStatusChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.checked
        });
    };

    const onSuccess = () => {
        setSubmit(true)
    }

    const handlers = {
        verify: () => {
            // setIdError(false);
            // setNameError(false);
            // if (values.name.length < 3) {
            //     setNameError(true)
            //     return false
            // }
            // if (!values.id) {
            //     //alert('Id field can not be empty')
            //     setIdError(true)
            //     return false
            // }
            setLoading(true)
            return true
        },
        formData: () => values,
        afterSubmit: () => {
            setLoading(false)
            setSubmit(true)
            afterSubmit()
            setSuccess(true)
            onClose()
        },
        onError: error => {
            setLoading(false)
            setSubmit(false)
            setError(error.error)
        }
    }

    useEffect(() => {
        if (!show) return
        setError(null)
        setSuccess(false)
        setLoading(false)
        setSubmit(false)
    }, [show])

    let body;

    if (loading) {
        body = <ModalBox>
            <CircularProgress sx={{ margin: 'auto' }} />
        </ModalBox>
    } else if (success) {
        body = <ModalBox>
            <Alert severity="success" sx={{ margin: 'auto' }}>Threshold updated</Alert>
        </ModalBox>
    } else if (error) {
        body = <ModalBox>
            <Alert severity="error" sx={{ margin: 'auto' }}>{error}</Alert>
        </ModalBox>
    } else {
        body =
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    lg={12}
                >
                    <TextField
                        fullWidth
                        label="Key"
                        helperText="Begins with letter and ontains letters, digits and underscores signs"
                        name="key"
                        onChange={handleChange}
                        required
                        value={values.key}
                        variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    lg={12}
                >
                    <TextField
                        fullWidth
                        label="Value"
                        helperText="Any values as string"
                        name="value"
                        onChange={handleChange}
                        required
                        value={values.value}
                        variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    lg={12}
                    sx={{ textAlign: 'center' }}
                >
                    <FormControlLabel
                        control={
                            <IOSSwitch
                                sx={{ m: 1 }}
                                name="status"
                                onChange={handleStatusChange}
                                checked={values.status}
                            />
                        }
                        label="Active status"
                    />
                </Grid>
            </Grid>
    }

    return (
        <div>
            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                aria-describedby="alert-dialog-description"
                open={show}
                TransitionComponent={Transition}
            >
                <DialogTitle id="customized-dialog-title" onClose={onClose}>
                    {id ? "Edit" : "Add New"}
                </DialogTitle >
                <DialogContent dividers>
                    <Form
                        handlers={handlers}
                        action={"/thresholds/" + (id ? id : "")}
                        method={id ? "PUT" : "POST"}
                        formonly
                        submit={submit}
                    >
                        {body}
                    </Form>
                </DialogContent>
                <DialogActions>
                    {error || success ?
                        <Button onClick={onClose} color='primary'>
                            Ok
                        </Button>
                        :
                        <Button autoFocus onClick={onSuccess} color='primary' disabled={loading}>
                            Save Changes
                        </Button>
                    }
                    <Button onClick={onClose} color='error'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
