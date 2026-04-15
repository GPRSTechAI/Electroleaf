import { Grid } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useIntervalFetch from "src/hooks/useIntervalFetch";
import ActuatorDetail from "./ActuatorDetail";
import ActuatorDashbordSkelton from "./ActuatorDashboardSkelton";
import { useState, forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ActuatorDashboard = () => {
    const [actuators, loading] = useIntervalFetch('/actuators', 5000)
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState({})

    const handleClose = () => {
        setToast(false)
    }

    const toastMessage = message => {
        setMessage(message)
        setToast(true)
    }

    if (loading) return <ActuatorDashbordSkelton />
    return (
        <>
            <Grid
                container
                spacing={3}
                direction="row"
                my={1}
            >
                {actuators.map((actuator, id) => <ActuatorDetail key={id} actuator={actuator} toastMessage={toastMessage} />)}
            </Grid>
            <Snackbar open={toast} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ActuatorDashboard;