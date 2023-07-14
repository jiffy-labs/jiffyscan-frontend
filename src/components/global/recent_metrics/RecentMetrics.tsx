import Chip, { ChipProps } from '@/components/common/chip/Chip';
import InfoButton from '@/components/common/InfoButton';
import React, { useState, useEffect } from 'react';
import recentMetrics from './recent_metrics.json';
import ScrollContainer from 'react-indiana-drag-scroll';
import NetworkSelector from '../../common/NetworkSelector';
import { getDailyMetrics, DailyMetric } from '@/components/common/apiCalls/jiffyApis';
import { CaptionProps } from '../../common/Caption';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import { prepareChartDataAndMetrics, ChartData } from './utils';
import { Chart } from './Chart';
import Spinner from '@/components/common/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const METRIC_DATA_POINT_SIZE = 42;

const getDailyMetricsFromCache = (network: string) => {
    // return metrics if not expired else return empty array
    const metricsCache: string | null = localStorage.getItem(`metrics-${network}`);
    const metricsCacheJson = metricsCache ? JSON.parse(metricsCache) : {};
    if (metricsCacheJson && metricsCacheJson.expiry && metricsCacheJson.expiry > Date.now()) {
        return metricsCacheJson.metrics;
    }
    return [];
};

const setDailyMetricsToCache = (network: string, dailyMetrics: DailyMetric[]) => {
    // set metrics in cache with expiry
    const metricsCacheJson = {
        metrics: dailyMetrics,
        expiry: Date.now() + 5 * 60 * 1000, // 5 mins
    };
    localStorage.setItem(`metrics-${network}`, JSON.stringify(metricsCacheJson));
};

function RecentMetrics({
    selectedNetwork,
    caption,
    hideMetrics,
    loading,
    setLoading,
}: {
    selectedNetwork: string;
    caption?: CaptionProps;
    hideMetrics?: boolean;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}) {
    const [metrics, setMetrics] = useState(recentMetrics as any);

    useEffect(() => {
        refreshMetricsChart(selectedNetwork);
    }, [selectedNetwork]);

    const refreshMetricsChart = async (network: string) => {
        let dailyMetrics: DailyMetric[] = [];
        setLoading(true);
        // check in cache first
        // if cache is empty, fetch from api and store in cache
        // if cache is not empty, set metrics using cache
        dailyMetrics = getDailyMetricsFromCache(network);
        if (dailyMetrics.length == 0) {
            console.log('fetching from api');
            dailyMetrics = await getDailyMetrics(network, METRIC_DATA_POINT_SIZE, toast);
            setDailyMetricsToCache(network, dailyMetrics);
        }
        console.log('from here to ');
        let metrics: any;
        const chartDataAndMetrics = prepareChartDataAndMetrics(dailyMetrics, recentMetrics, METRIC_DATA_POINT_SIZE, network);
        let newChartData: ChartData = chartDataAndMetrics.chartData;
        metrics = chartDataAndMetrics.metrics;
        setMetrics(metrics);
        setLoading(false);
        console.log('here');
    };
    return (
        <main className="mb-10">
            <div className="container">
                
                    <div>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <div className="w-full">
                                <ScrollContainer>
                                    <div className="grid grid-cols-4 gap-2 min-w-[700px] ">
                                        {Object.keys(metrics).map((key) => {
                                            const { id, title, value, status, data, labels, toolTipValue } = metrics[key];
                                            return (
                                                <div className="p-4 bg-white border rounded border-dark-200 shadow-200" key={id}>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-sm leadsdsdsding-[1.3]">{title} </span>
                                                        <InfoButton data={toolTipValue} />
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <img
                                                            src={NETWORK_ICON_MAP[selectedNetwork]}
                                                            style={{ height: '16px', width: '16px' }}
                                                            alt=""
                                                        />
                                                        <span className="font-bold">{value}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mb-4">
                                                        <span className="text-sm text-dark-500">{status}</span>
                                                        {status.includes('-') ? (
                                                            //
                                                            <SouthEastIcon style={{ height: 12, width: 12, color: '#FF5252' }} />
                                                        ) : (
                                                            <NorthEastIcon style={{ height: 12, width: 12, color: '#4CAF50' }} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Chart chartValues={data} labels={labels} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </ScrollContainer>
                                <ToastContainer />
                            </div>
                        )}
                    </div>
            </div>
        </main>
    );
}

export default RecentMetrics;
