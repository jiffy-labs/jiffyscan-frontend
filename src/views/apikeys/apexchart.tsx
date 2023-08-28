import React from 'react';
// import { Chart as Chartjs, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import dynamic from 'next/dynamic';
import { Line } from 'react-chartjs-2';
// Chartjs.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const data = {
    series: [
        {
            name: 'Desktops',
            data: [10, 41, 35, 41, 49, 29, 47, 20],
        },
    ],
    options: {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
            colors: ['#FF5252'],
        },
        markers: {
            size: 5,
            strokeWidth: 2,
            hover: {
                size: 7,
            },
            fillColors: ['red'], // Set fill color to blue (#4CAF50)
            strokeColors: ['#4CAF50'], // Set border color to blue
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.5,
            },
            column: {
                colors: ['transparent', 'transparent'],
            },
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        xaxis: {
            categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            labels: {
                offsetX: 14,
                offsetY: -5,
            },
            style: {
                fontSize: '12px',
                colors: '#4CAF50',
            },
        },
        axisBorder: {
            show: false,
        },
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    if (value === 10) return '0';
                    if (value === 20) return '7.5k';
                    if (value === 30) return '15k';
                    if (value === 40) return '22.5k';
                    if (value === 50) return '30k';
                    return value;
                },
            },
        },
    },
};

// const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//         {
//             label: 'First dataset',
//             data: [33, 53, 85, 41, 44, 65],
//             fill: true,
//             backgroundColor: 'rgba(75,192,192,0.2)',
//             borderColor: 'rgba(75,192,192,1)',
//         },
//         {
//             label: 'Second dataset',
//             data: [33, 25, 35, 51, 54, 76],
//             fill: false,
//             borderColor: '#742774',
//         },
//     ],
// };

function ApexLineChart() {
    return (
        <div>
            <Chart options={data.options as any} series={data.series} type="line" height={250} className="mt-2" />
            {/* <Line data={data} /> */}
        </div>
    );
}
export default ApexLineChart;
