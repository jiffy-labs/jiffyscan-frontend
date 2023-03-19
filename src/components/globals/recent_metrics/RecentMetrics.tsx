import Chip, { ChipProps } from "@/components/common/chip/Chip";
import InfoButton from "@/components/common/InfoButton";
import React, { useState, useEffect } from "react";
import recentMetrics from "./recent_metrics.json";
import ScrollContainer from "react-indiana-drag-scroll";
import NetworkSelector from "./NetworkSelector";
import { getDailyMetrics, DailyMetric } from "@/components/common/apiCalls/jiffyApis";
import { NETWORK_ICON_MAP } from "@/components/common/constants";
import { prepareChartDataAndMetrics, ChartData } from "./utils";
import { Chart } from "./Chart";

const METRIC_DATA_POINT_SIZE = 14;

function RecentMetrics({ selectedNetwork, handleNetworkChange }: { selectedNetwork: string, handleNetworkChange: (network: string) => void }) {
  const [chartData, setChartData] = useState({} as ChartData);
  const [metrics, setMetrics] = useState(recentMetrics as any);

  useEffect(() => {
    refreshMetricsChart(selectedNetwork)
  }, [selectedNetwork])

  const refreshMetricsChart = async (network: string,) => {
    const dailyMetrics: DailyMetric[] = await getDailyMetrics(network, METRIC_DATA_POINT_SIZE);
    let metrics: any;
    const chartDataAndMetrics = prepareChartDataAndMetrics(dailyMetrics, recentMetrics, METRIC_DATA_POINT_SIZE);
    let newChartData: ChartData = chartDataAndMetrics.chartData;
    metrics = chartDataAndMetrics.metrics;
    setChartData(newChartData);
    setMetrics(metrics);
  }


  return (
    <main className="mb-10">
      <div className="container">
        <div className="flex justify-between flex-wrap items-center gap-3 md:gap-10 py-2 mb-4">
          <div className="flex items-center gap-2 flex-grow">
            <img src="/images/cube-unfolded.svg" alt="" />
            <b className="font-bold text-lg">Recent Metrics</b>
            <InfoButton />
          </div>
          <NetworkSelector selectedNetwork={selectedNetwork} handleNetworkChange={handleNetworkChange} />
        </div>
        <div className="w-full">
          <ScrollContainer>
            <div className="grid grid-cols-4 gap-2 min-w-[700px]">
              {Object.keys(metrics).map((key) => {
                const { id, title, value, status, data, labels } = metrics[key];
                return (
                  <div
                    className="p-4 rounded border border-dark-200 bg-white shadow-200"
                    key={id}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-sm leading-[1.3]">{title}</span>
                      <InfoButton />
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={NETWORK_ICON_MAP[selectedNetwork]} style={{ height: "16px", width: '16px' }} alt="" />
                      <span className="font-bold">{value}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-sm text-dark-500">{status}%</span>
                      <img src="/images/icon-container (9).svg" alt="" />
                    </div>
                    <div>
                      <Chart chartValues={data} labels={labels}/>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </ScrollContainer>
        </div>
      </div>
    </main>
  );
}

export default RecentMetrics;
