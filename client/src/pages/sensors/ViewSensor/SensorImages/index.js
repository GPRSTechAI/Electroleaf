import { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    CardHeader,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import moment from 'moment';
import useIntervalFetch from 'src/hooks/useIntervalFetch';
import NewSensorImage from './NewSensorImage';

const products = [
    {
        id: 1,
        name: 'Dropbox',
        imageUrl: '/static/images/products/product_1.png',
        updatedAt: moment().subtract(2, 'hours')
    },
    {
        id: 2,
        name: 'Medium Corporation',
        imageUrl: '/static/images/products/product_2.png',
        updatedAt: moment().subtract(2, 'hours')
    },
    {
        id: 3,
        name: 'Slack',
        imageUrl: '/static/images/products/product_3.png',
        updatedAt: moment().subtract(3, 'hours')
    },
    {
        id: 4,
        name: 'Lyft',
        imageUrl: '/static/images/products/product_4.png',
        updatedAt: moment().subtract(5, 'hours')
    },
    {
        id: 5,
        name: 'GitHub',
        imageUrl: '/static/images/products/product_5.png',
        updatedAt: moment().subtract(9, 'hours')
    }
];

const SensorImages = ({ id, ...props }) => {
    // const [sensorImages] = useIntervalFetch('/sensorImages/forSensor/' + id, 5000);
    const sensorImages = []
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState({ time: '', sensor: id })

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewImage = () => {
        setImage({ time: moment([]).format('YYYY-MM-DDTHH:mm'), sensor: id });
        handleOpen();
    }

    return (
        <>
            <Card {...props}>
                <CardHeader
                    title="Sensor Images"
                    subtitle={` total`}
                />
                <Divider />
                <List>
                    {sensorImages.map((image, i) => (
                        <ListItem
                            divider={i < products.length - 1}
                            key={image._id}
                        >
                            <ListItemAvatar>
                                <img
                                    alt="img"
                                    src={`${process.env.REACT_APP_FILE_FOLDER}${image._id}.jpeg`}
                                    style={{
                                        height: 48,
                                        width: 48
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={moment(image.time).format('DD/MM/YYYY hh:mm:ss')}
                                secondary={`Updated ${moment(image.updatedAt).fromNow()}`}
                            />
                            <IconButton
                                edge="end"
                                size="small"
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        endIcon={<ArrowRightIcon />}
                        size="small"
                        variant="text"
                        onClick={handleNewImage}
                    >
                        Add Image
                    </Button>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            endIcon={<ArrowRightIcon />}
                            size="small"
                            variant="text"
                        >
                            View all
                        </Button>
                    </Box>
                </CardActions>
            </Card>
            <NewSensorImage
                open={open}
                image={image}
                setImage={setImage}
                handleClose={handleClose}
            />
        </>
    );
}

export default SensorImages;