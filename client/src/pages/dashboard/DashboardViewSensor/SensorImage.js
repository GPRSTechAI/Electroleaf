import { useParams } from 'react-router';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    colors,
    useTheme,
    Paper,
    Button
} from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
// import Carousel from 'react-material-client-carousel';
import useIntervalFetch from 'src/hooks/useIntervalFetch';
import moment from 'moment';

const Item = ({ item: { _id, time, updatedAt } }) => {
    const theme = useTheme();
    return (
        <Paper style={{ height: '100%' }}>
            <div style={{ position: 'absolute', color: 'white', padding: '5px', ...theme.typography }}>
                <h2>{moment(time).format('DD/MM/YYYY hh:mm:ss')}</h2>
                <p>{`Updated ${moment(updatedAt).fromNow()}`}</p>
            </div>
            <img src={`${process.env.REACT_APP_FILE_FOLDER}${_id}.jpeg`} alt="img" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

const SensorImage = (props) => {
    const theme = useTheme();
    const { sensor } = useParams();
    // const { data: sensorImages } = useIntervalFetch('/sensorImages/forSensor/' + sensor, 5000);
    const sensorImages = []

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            img: "https://3z6mv8219w2s2w196j1dkzga-wpengine.netdna-ssl.com/wp-content/uploads/2020/12/Veganic-Farming-Crops-Without-Use-Of-Animals.png"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            img: "https://owita.lk/images/farms/via-village.jpg"
        }
    ]

    return (
        <Card {...props}>
            <CardHeader title="Sensor images" />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    {/* <Carousel
                        autoPlay={false}
                    >
                        {
                            sensorImages?.map((item, i) => <Item key={i} item={item} />)
                        }
                    </Carousel> */}
                </Box>
            </CardContent>
        </Card>
    );
};

export default SensorImage;
