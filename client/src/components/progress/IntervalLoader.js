import { useState, useEffect } from 'react'
import {
    LinearProgress
} from '@mui/material';

const IntervalLoader = ({ interval, progressFrequent = 20, dependancy }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(0)
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                return oldProgress + (100 / progressFrequent)
            });
        }, interval / progressFrequent);

        return () => {
            clearInterval(timer);
        };
    }, [dependancy])

    return (
        <LinearProgress variant="determinate" value={progress} />
    );
}

export default IntervalLoader;