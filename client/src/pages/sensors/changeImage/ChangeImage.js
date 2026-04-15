import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Grid,
    Container,
    Box,
    Typography,
    Stack,
    Divider
} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem, { imageListItemClasses } from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import SensorImageItem from './SensorImageItem';
import useEditData from 'src/hooks/useEditData';

const ChangeImage = () => {
    const { id } = useParams();
    const [sensorDetails, setSensorDetails] = useState({ parameters: [] })
    const [loading, setLoading] = useState(true)

    useEditData(
        id && '/sensors/find/' + id,
        (sensorDetail) => {
            setSensorDetails(sensorDetail)
            setLoading(false)
        }
    )

    return (
        <>
            <Helmet>
                <title>Change image | Electro Leaf</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 2 }}>
                    <ImageList>
                        <ImageListItem key="Subheader" cols={4}>
                            <ListSubheader component="div">Sensor Images</ListSubheader>
                        </ImageListItem>
                    </ImageList>
                    <Box
                        sx={{
                            display: "grid",
                            gap: 1,
                            gridTemplateColumns: {
                                xs: "repeat(1, 1fr)",
                                sm: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr)",
                                lg: "repeat(4, 1fr)"
                            },
                            // standard variant from here:
                            // https://github.com/mui-org/material-ui/blob/3e679ac9e368aeb170d564d206d59913ceca7062/packages/mui-material/src/ImageListItem/ImageListItem.js#L42-L43
                            [`& .${imageListItemClasses.root}`]: {
                                display: "flex",
                                flexDirection: "column"
                            }
                        }}
                    >
                        <SensorImageItem type="Sensor" id={sensorDetails.id} image={sensorDetails.image} />
                        {sensorDetails.parameters.map((item) => (
                            <SensorImageItem key={item.id} image={item.image} type="Parameter" id={item.id} name={item.name} />
                        ))}
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default ChangeImage;