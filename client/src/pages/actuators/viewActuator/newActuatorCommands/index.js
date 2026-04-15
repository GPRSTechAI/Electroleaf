import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    TextField,
    Modal,
    Backdrop,
    Fade,
    Button
} from '@mui/material';
import { Stack } from '@mui/material';
import Form from 'src/components/form/Form';
import moment from 'moment';

const NewActuatorCommand = ({ command, open, handleClose, setCommand }) => {
    const { _id: id } = command;

    const handleChange = (event) => {
        setCommand({
            ...command,
            [event.target.name]: event.target.value
        });
    };

    const handleFrequent = (frequent) => {
        setCommand(command => ({ ...command, frequent }))
    }

    const handleClickDay = (day, run) => {
        if (run) {
            setCommand(command => ({ ...command, days: [...command.days, day] }))
        } else {
            setCommand(command => ({ ...command, days: command.days.filter(arrayDay => arrayDay !== day) }))
        }
    }

    const handlers = {
        verify: () => {
            console.log(moment(command.time, 'HH:mm').valueOf())
            if (!command.time) {

            }
            else if (command.duration === '') {
                return false
            }
            return true
        },
        formData: () => ({ ...command, time: moment(command.time, 'HH:mm').valueOf(), duration: command.duration * 1000 }),
        afterSubmit: () => {
            console.log('success')
            handleClose()
        }
    }
    useEffect(() => {
        setCommand({
            ...command,
            time: moment(command.time || []).format('HH:mm')
        });
    }, [open])
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{
                    width: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto'
                }}
            >
                <Fade in={open}>
                    <div>
                        <Form
                            title="Command"
                            subheader="Schedule New Command"
                            handlers={handlers}
                            action={id ? "/actuatorCommands/" + id : "/actuatorCommands"}
                            method={id ? "PUT" : "POST"}
                            noContainer
                        >
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Time"
                                        helperText="Command sending time"
                                        name="time"
                                        type="time"
                                        onChange={handleChange}
                                        required
                                        value={command.time}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        helperText="Duration in seconds"
                                        label="Duration"
                                        name="duration"
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        value={command.duration}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                mt={1}
                                item
                            >
                                <Button variant={command.frequent === "repeat" ? "contained" : "outlined"} color="secondary" width={1} onClick={() => handleFrequent('repeat')}>
                                    Repeat
                                </Button>
                                <Button sx={{ ml: 1 }} variant={command.frequent === "once" ? "contained" : "outlined"} color="secondary" width={1} onClick={() => handleFrequent('once')}>
                                    Once
                                </Button>
                            </Grid>
                            {command.frequent === 'repeat'
                                ? <>
                                    <Grid
                                        mt={0}
                                        spacing={1}
                                        container
                                    >
                                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, id) => (
                                            <Grid
                                                key={id}
                                                mt={0}
                                                item
                                            >
                                                <Button
                                                    sx={{ mx: 0 }}
                                                    variant={command.days.includes(id) ? "contained" : "outlined"}
                                                    size="small"
                                                    color="secondary"
                                                    width={1}
                                                    onClick={() => handleClickDay(id, !command.days.includes(id))}
                                                >
                                                    {day}
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid
                                        mt={1}
                                        item
                                    >
                                        <Button variant="contained" color="primary" width={1} onClick={() => handleFrequent('repeat')}>
                                            More
                                        </Button>
                                    </Grid>
                                </>
                                : <>
                                    <Grid
                                        mt={1}
                                        item
                                    >
                                        <TextField
                                            fullWidth
                                            label="Date"
                                            helperText="Command sending date"
                                            name="date"
                                            type="date"
                                            onChange={handleChange}
                                            required
                                            value={command.date || Date.now()}
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                </>
                            }
                        </Form>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

export default NewActuatorCommand;
