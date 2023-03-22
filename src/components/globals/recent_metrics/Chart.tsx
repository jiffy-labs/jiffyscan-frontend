import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: "top" as const
        },
        title: {
            display: false,
            text: "Chart.js Line Chart"
        }
    },
    scales: {
        x: {
            display: false
        },
        y: {
            display: false
        }
    }
};

const labels = ["January", "February", "March", "April", "January", "January", "January"];
var colors = ["rgba(255,0,0,1)", "rgba(0,255,0,1)", "rgba(0,0,255,1)", "rgba(255,0,0,1)", "rgba(0,255,0,1)"];
interface ChartProps{
    chartValues: number[];
    labels: string[];
 }

export function Chart(props : ChartProps) {
    // get highest number
const highest = Math.max(...props.chartValues);

// get lowest number
const lowest = Math.min(...props.chartValues);
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: " ",
                data: props.chartValues,
                borderColor: "#263238",
                backgroundColor: "#263238",
                pointBackgroundColor: function(context:any) {
                    var index = context.dataIndex
                    var value = context.dataset.data[index]
                    return value === highest ? 'green' : value === lowest ? "red" : ""
                }
            }
        ]
    };
    return <Line className="padding" options={options} data={data} />;
}