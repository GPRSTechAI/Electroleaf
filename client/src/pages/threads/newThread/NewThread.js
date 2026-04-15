import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid,
    TextField,
    Button,
    Tabs,
    Tab,
    Typography,
    Card,
    CardHeader,
    Divider,
    CardContent,
    Switch,
    FormControlLabel
} from '@mui/material';
import Form from 'src/components/form/Form';
import useEditData from 'src/hooks/useEditData';
import moment from 'moment';
import Schedule from './Schedule'
import Devices from './devices/Devices'
import Condition from './Condition';
import ThreadFooter from './ThreadFooter';

const tabs = ['schedule', 'devices', 'condition']
const tabLabels = ['Configure scheduling', 'Map corresponding devices', 'Configure Conditions']

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const NewThread = () => {
    const { tab: currentTab, id } = useParams();
    const navigate = useNavigate()

    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        type: 'repeat',
        execute: false,
        schedule: {
            repeat: {
                time: moment([]).format('HH:mm'),
                days: [0, 1, 2, 3, 4, 5, 6]
            },
            interval: {
                interval: 10
            },
            once: {
                time: moment([]).format('HH:mm'),
                date: moment([]).format('YYYY-MM-DD')
            },
            onReading: {
                number: 1
            }
        },
        devices: {
            sensorParameters: [],
            actuatorIds: []
        },
        condition: {
            condition: true,
            conditionFile: '',
            duration: 10
        },
    });

    const handleTabChange = (event, newValue) => {
        navigate((id ? `/app/threads/edit/${id}/` : '/app/threads/new/') + tabs[newValue])
    };

    const handlers = {
        formData: () => {
            let thread = { ...values };
            console.log(values)
            thread.devices = {
                sensorParameters: values.devices.sensorParameters.map(para => ({
                    sensorId: para.sensorId,
                    parameterId: para.parameterId,
                    feedReadings: Number(para.feedReadings || 1)
                })),
                actuatorIds: values.devices.actuatorIds.map(actuator => actuator.id || actuator._id)
            }
            thread.schedule = {}
            switch (values.type) {
                case 'repeat':
                    thread.schedule.repeat = {
                        time: {
                            hour: values.schedule.repeat.time.split(':')[0],
                            minute: values.schedule.repeat.time.split(':')[1],
                        },
                        days: values.schedule.repeat.days
                    }
                    break;
                case 'interval':
                    thread.schedule.interval = {
                        interval: values.schedule.interval.interval
                    }
                    break;
                case 'once':
                    thread.schedule.once = {
                        dateTime: new Date(values.schedule.once.date + ' ' + values.schedule.once.time)
                    }
                    break;
                case 'onReading':
                    thread.schedule.onReading = {
                        number: values.schedule.onReading.number
                    }
                    break;
            }
            return thread
        },
        verify: values => {
            if (values.condition.condition && !values.condition.conditionFile) {
                alert('Condition file not specified')
                return false
            }
            if (!values.devices.actuatorIds.length) {
                alert('Select at least one actuator')
                return false
            }
            console.log(values)
            return true
        },
        //callback function to do after form submitted
        afterSubmit: () => {
            navigate('/app/threads');
        }
    }

    useEditData(
        id && '/threads/find/' + id,
        thread => {
            if (id) {
                const newValues = { ...values }
                newValues.type = thread.type
                newValues.devices = {
                    sensorParameters: thread.devices.fullSensorParameters,
                    actuatorIds: thread.devices.actuators
                }
                newValues.condition = thread.condition
                newValues.execute = thread.execute
                switch (thread.type) {
                    case 'repeat':
                        newValues.schedule.repeat = {
                            time: thread.schedule.repeat.time.hour.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            }) + ":" + thread.schedule.repeat.time.minute,
                            days: thread.schedule.repeat.days
                        }
                        break;
                    case 'interval':
                        newValues.schedule.interval = thread.schedule.interval
                        break;
                    case 'once':
                        const dateTime = new Date(thread.schedule.once.dateTime)
                        newValues.schedule.once = {
                            date: moment(dateTime).format('YYYY-MM-DD'),
                            time: moment(dateTime).format('HH:mm')
                        }
                        break;
                    case 'onReading':
                        newValues.schedule.onReading = thread.schedule.onReading
                        break;
                }
                setValues(newValues)
                setLoading(false)
            }
        }
    )

    useEffect(() => {
        if (!currentTab) return navigate('schedule', { replace: true })
        setTab(tabs.indexOf(currentTab));
    }, [currentTab])

    if (loading) return null

    return (
        <>
            <Helmet>
                <title>New Thread | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth="lg">
                    <Form
                        handlers={handlers}
                        action={id ? "/threads/" + id : "/threads"}
                        method={id ? "PUT" : "POST"}
                        formonly
                    >
                        <Card>
                            <CardHeader
                                title={'New Thread'}
                                subheader={tabLabels[tabs.indexOf(currentTab)]}
                            />
                            <Divider />
                            <CardContent sx={{ padding: 0 }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                                        <Tab label="Schedule" {...a11yProps(0)} />
                                        <Tab label="Devices" {...a11yProps(1)} />
                                        <Tab label="Condition" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={tab} index={0}>
                                    <Schedule values={values} setValues={setValues} />
                                </TabPanel>
                                <TabPanel value={tab} index={1}>
                                    <Devices values={values} setValues={setValues} />
                                </TabPanel>
                                <TabPanel value={tab} index={2}>
                                    <Condition values={values} setValues={setValues} />
                                </TabPanel>
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    p: 2
                                }}
                            >
                                <ThreadFooter values={values} setValues={setValues} />
                            </Box>
                        </Card>
                    </Form>
                </Container>
            </Box>
        </>
    );
}

export default NewThread;
