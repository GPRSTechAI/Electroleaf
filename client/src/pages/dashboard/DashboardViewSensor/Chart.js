import { useRef, useMemo, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, TimeScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import ChartStreaming from 'chartjs-plugin-streaming';
import 'chartjs-adapter-moment';
import useFetch from 'src/hooks/useFetch';
import useIntervalFetch from 'src/hooks/useIntervalFetch';
import { useQuery, gql } from '@apollo/client';
import {
    Backdrop,
    CircularProgress,
    colors,
    useTheme
} from '@mui/material';
import moment from 'moment'
import optionGenerator from './chartOptions'

// ChartJS.register(TimeScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, zoomPlugin, ChartStreaming);
ChartJS.register(...registerables, zoomPlugin, ChartStreaming);
// Change default options for ALL charts
// ChartJS.defaults.set('plugins.streaming', {
//     duration: 10000
// });

// const SENSOR_READINGS = gql`
//         query GetSensorReadings($sensorId: ID, $items: Int, $gt: Float, $gte: Float, $lt: Float, $lte: Float) {
//             sensorReadings(sensorId: $sensorId, items: $items, gt: $gt, gte: $gte, lt: $lt, lte: $lte) {
//                 _id
//                 time
//                 value
//             }
//         }
//     `;

const Chart = ({ sensorId, parameterId, page, limit, from, to }) => {
    const chartRef = useRef(null);
    const theme = useTheme();
    /*useEffect(() => {
        if (from && chart) {
            chart.current.chartInstance.chart.boxes[2].min = from
        }
    }, [from, to])*/
    const variables = { sensorId };
    if (from || to) {
        variables.gte = from;
        variables.lte = to;
    } else {
        variables.items = 10
    }
    // const { data: { sensorReadings } = { sensorReadings: [] } } = useQuery(
    //     SENSOR_READINGS,
    //     {
    //         variables,
    //         pollInterval: 5000
    //     }
    // );
    const [sensorDetail, isLoading] = useFetch('/sensors/find/' + sensorId, { parameters: [] })
    const paginationUrl = `?offset=${limit * page}&limit=${limit}`
    const url = parameterId ? `/sensorReadings/dashboard/parameter/${sensorId}/${parameterId}${paginationUrl}` : `/sensorReadings/dashboard/sensors/${sensorId}${paginationUrl}`
    // const [sensorReadings] = useIntervalFetch(url, 15000)
    const [sensorReadings, loading] = useFetch(url)

    const updateReading = chart => {
        fetch(process.env.REACT_APP_API_HOST + url,)
            .then(res => {
                if (res.status !== 200 && res.status !== 304) {
                    throw Error('could not fetch data')
                }
                return res.json()
            })
            .then(data => {
                console.log(parameterId)
                if (parameterId) {
                    chart.data.datasets[0].data = data
                    chart.update('quiet');
                } else {
                    // chart.data.datasets.forEach(function (dataset) {
                    //     dataset.data.push({
                    //         x: Date.now(),
                    //         y: (Math.random()) * Math.round(Math.random() * 100)
                    //     });
                    // });
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.log(err)
                }
            });
    }

    useEffect(() => {
        console.log(chartRef.current)
        if (!chartRef || !chartRef.current) return
        // const newChartInstance = new ChartJS(chartRef.current, options);
        // setChartInstance(newChartInstance);
        // const datasets = parameterId
        //     ? [
        //         {
        //             backgroundColor: colors.indigo[500],
        //             data: sensorReadings,
        //             label: 'This year',
        //             fill: false
        //         }
        //     ]
        //     : sensorDetail.parameters.map(parameter => ({
        //         backgroundColor: colors.indigo[500],
        //         data: sensorReadings[parameter.id],
        //         label: `${parameter.id} - ${parameter.name}`,
        //         fill: false
        //     }))
        // chartRef.current.data.datasets = datasets;
        // chartRef.current.update()
        console.log('success')
    }, [chartRef.current]);

    // useEffect(() => {
    //     if (!chartRef || !chartRef.current) return
    //     chartRef.current.zoom(zoom)
    // }, [sensorReadings, zoom])

    const data = {
        datasets: parameterId
            ? [
                {
                    backgroundColor: colors.indigo[500],
                    // data: [],
                    data: sensorReadings,
                    label: `${parameterId} - ${sensorId}`,
                    fill: false
                }
            ]
            : sensorDetail.parameters.map(parameter => ({
                backgroundColor: colors.indigo[500],
                // data: [],
                data: sensorReadings[parameter.id],
                label: `${parameter.id} - ${parameter.name}`,
                fill: false
            })),
    }

    const minMax = useMemo(() => {
        if (parameterId) {
            const min = Math.min(...sensorReadings.map(r => r.y))
            const max = Math.max(...sensorReadings.map(r => r.y))
            console.log([min, max])
            return [min, max]
        } else {
            const values = Object.values(sensorReadings).reduce((pre, cur) => [...pre, ...cur.map(r => r.y)], [])
            const min = Math.min(...values)
            const max = Math.max(...values)
            console.log([min, max])
            return [min, max]
        }
    }, [sensorReadings])

    const options = optionGenerator(theme, from, to, minMax)

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', position: 'absolute', height: '100%' }}
                open={isLoading || loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Line
                redraw={false}
                data={data}
                options={options}
                ref={chartRef}
            />
        </>
    );
}

export default Chart;