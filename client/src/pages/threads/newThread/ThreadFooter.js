import { Link } from 'react-router-dom'
import {
    Grid,
    Switch,
    FormControlLabel,
    Button
} from '@mui/material';
import { ArrowLeft as BackIcon } from 'react-feather'

const ThreadFooter = ({ values, setValues }) => {

    const handleStatusChange = e => {
        setValues({ ...values, execute: e.target.checked })
    }

    return (
        <>
            <Grid
                container
            >
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                    md={6}
                    xs={12}
                >

                    <Button
                        startIcon={<BackIcon />}
                        component={Link}
                        to="/app/threads"
                        color="primary"
                        variant="contained"
                        type="button"
                    >
                        Go back
                    </Button>
                </Grid>
                <Grid
                    mt={1}
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                    md={6}
                    xs={12}
                >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.execute}
                                onChange={handleStatusChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label="Execute"
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Save details
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default ThreadFooter;