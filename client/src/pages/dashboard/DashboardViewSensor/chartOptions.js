export default (theme, from, to, minMax) => ({
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxis:
        {
            type: (from || to ? 'time' : 'time'),
            distribution: 'linear',
            ticks: {
                source: 'auto',
                fontColor: theme.palette.text.secondary,
                maxTicksLimit: 11,
                sampleSize: 5

            },
            gridLines: {
                display: false,
                drawBorder: false
            }
        },
        yAxis: {
            ticks: {
                fontColor: theme.palette.text.secondary,
                beginAtZero: true,
                autoSkip: true,
                min: 0,
            },
            gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: theme.palette.divider,
                drawBorder: true,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
                zeroLineColor: theme.palette.divider
            },
            suggestedMin: minMax[0],
            suggestedMax: minMax[1]
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
    hover: {
        mode: 'nearest',
        intersect: false
    },
    plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: 'x',
                onPan: chart => {
                    // console.log(chart.chart.boxes[2].min, chart.chart.boxes[2].max)
                }
            },
            zoom: {
                pinch: {
                    enabled: true       // Enable pinch zooming
                },
                wheel: {
                    enabled: true       // Enable wheel zooming
                },
                mode: 'x',
            },
            limits: {
                x: {
                    minDelay: null,     // Min value of the delay option
                    maxDelay: null,     // Max value of the delay option
                    minDuration: null,  // Min value of the duration option
                    maxDuration: null   // Max value of the duration option
                }
            }
        }
    },
    pan: {
        enabled: true,
        mode: "x",
        speed: 10
    },
})