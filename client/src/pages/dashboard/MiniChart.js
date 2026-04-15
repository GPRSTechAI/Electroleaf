import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineElement, PointElement, LinearScale, Tooltip, } from 'chart.js';
import {
    useTheme,
    colors
} from '@mui/material';

ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale, Tooltip);

const MiniChart = ({ name, readings, ...props }) => {
    const theme = useTheme();

    const data = {
        datasets: [
            {
                backgroundColor: colors.indigo[500],
                data: [...readings].reverse(),
                // data: readings.map(reading => reading.value),
                // label: name
            }
        ],
        labels: Array(readings.length).fill("")
    };

    const options = {
        animation: true,
        cornerRadius: 20,
        layout: { padding: 2 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            point: {
                radius: 2
            },
            line: {
                tension: 0,
                fill: false,
            }
        },
        scales: {
            x: {
                barThickness: 12,
                maxBarThickness: 10,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
                ticks: {
                    display: false,
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: true,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    display: true,
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0,
                    fontSize: 7
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        },
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Chart Title'
            }
        },
    };
    return (
        <Line
            {...props}
            height={56}
            width={100}
            data={data}
            options={options}
        />
    );
}

export default MiniChart;