import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const ReadingComponent = () => (
    <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
    >
        <Skeleton variant="rectangular" height={128} />
    </Grid>
)

const SensorSkeleton = () => {
    return (
        <>
            <Skeleton variant="rectangular" height={30.75} sx={{ mb: 1 }} />
            <Grid
                container
                spacing={3}
                direction="row"
                mb={3}
            >
                <ReadingComponent />
                <ReadingComponent />
                <ReadingComponent />
            </Grid>
            <Skeleton variant="rectangular" height={36.5} sx={{ mb: 1 }} />
            <Grid
                container
                spacing={3}
                direction="row"
                mb={3}
            >
                <ReadingComponent />
                <ReadingComponent />
            </Grid>
        </>
    );
}

export default SensorSkeleton;