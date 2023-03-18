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
import { ChartData } from "./utils";
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

interface ChartProps{
    chartValues: number[];
 }

export function Chart(props : ChartProps) {
    console.log('here',props.chartValues)
    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: props.chartValues,
                borderColor: "#263238",
                backgroundColor: "#263238"
            }
        ]
    };
    return <Line className="padding" options={options} data={data} />;
}