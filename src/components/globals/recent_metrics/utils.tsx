import { DailyMetric } from '@/components/common/apiCalls/jiffyApis';
import { getDate, getFee } from '@/components/common/utils';
import { useEffect, useState } from 'react';
// Please consult @lazycoder1  / Gautam Sabhahit as to what is happening here XD
export interface ChartData {
    userOpMetric: number[];
    totalwalletsCreatedMetric: number[];
    walletsCreatedMetric: number[];
    totalFeeCollectedMetric: number[];
    daySinceEpoch: number[];
}

export const prepareDayWiseData = (dailyMetrics: DailyMetric[], dataSize: number) => {
    const todayDaySinceEpoch: number = Math.floor(Date.now() / 86400000);
    let chartData: ChartData = {
        userOpMetric: [],
        totalwalletsCreatedMetric: [],
        walletsCreatedMetric: [],
        totalFeeCollectedMetric: [],
        daySinceEpoch: [],
    };
    const dailyData: { [key: string]: DailyMetric } = {};
    for (let i = 0; i < dataSize; i++) {
        dailyData[todayDaySinceEpoch - i] = {
            userOpsDaily: '0',
            bundleDaily: '0',
            walletsCreatedDaily: '0',
            gasCostCollectedDaily: '0',
            userOpsTotal: '0',
            bundlesTotal: '0',
            walletsCreatedTotal: '0',
            gasCostCollectedTotal: '0',
            daySinceEpoch: (todayDaySinceEpoch - i).toString(),
        };
    }
    for (let i = 0; i < dailyMetrics.length; i++) {
        dailyData[dailyMetrics[i].daySinceEpoch] = dailyMetrics[i];
    }
    // fill total wallets created metrics for empty days
    let totalWalletsCreatedPointer = 0;
    for (let i = dataSize - 1; i >= 0; i--) {
        if (parseInt(dailyData[todayDaySinceEpoch - i].walletsCreatedTotal) == 0) {
            dailyData[todayDaySinceEpoch - i].walletsCreatedTotal = totalWalletsCreatedPointer.toString();
        } else {
            totalWalletsCreatedPointer = parseInt(dailyData[todayDaySinceEpoch - i].walletsCreatedTotal);
        }
    }

    for (let i = dataSize - 1; i >= 0; i--) {
        // The DailyData is ordered from newest to oldest, we want the other way around when displaying the chart
        chartData.userOpMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].userOpsDaily));
        chartData.totalwalletsCreatedMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].walletsCreatedTotal));
        chartData.walletsCreatedMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].walletsCreatedDaily));
        chartData.totalFeeCollectedMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].gasCostCollectedDaily));
        chartData.daySinceEpoch.push(todayDaySinceEpoch - i);
    }
    return chartData;
};

const getPercentageChange = (numberArray: number[]) => {
    // calculate the different between the first half and second half
    const firstHalf = numberArray.slice(0, numberArray.length / 2);
    const firstHalfSum = getSum(firstHalf);
    const secondHalf = numberArray.slice(-numberArray.length / 2);
    const secondHalfSum = getSum(secondHalf);
    if (firstHalfSum == 0) return 'NaN';
    const percentageChange = ((secondHalfSum - firstHalfSum) / firstHalfSum) * 100;
    return percentageChange.toFixed(1).toString();
};

const getSum = (numberArray: number[]) => {
    const sum = numberArray.reduce((a, b) => a + b, 0);
    return sum;
};

export const prepareChartDataAndMetrics = (dailyMetrics: DailyMetric[], metrics: any, dataSize: number, network: string) => {
    // This is the problem, the daily metric chart will not be consistent. For the days that there are no
    // user operations, the data point for that day will not exist. So we are creating an empty dailyData object will all the days.
    // and later populating it with the daily metric. Then creating a list out of it.
    let chartData: ChartData = prepareDayWiseData(dailyMetrics, dataSize);
    let feeString: string = getFee(chartData.totalFeeCollectedMetric.slice(-1)[0], network);

    metrics.userOpMetric.value = chartData.userOpMetric.slice(-1)[0];
    metrics.totalFeeCollectedMetric.value = feeString;
    metrics.totalwalletsCreatedMetric.value = chartData.totalwalletsCreatedMetric.slice(-1)[0];
    metrics.walletsCreatedDailyMetric.value = chartData.walletsCreatedMetric.slice(-1)[0];

    metrics.userOpMetric.status = getPercentageChange(chartData.userOpMetric) + "% WoW%";
    metrics.totalFeeCollectedMetric.status = getPercentageChange(chartData.totalFeeCollectedMetric) + "% WoW";
    metrics.totalwalletsCreatedMetric.status = getPercentageChange(chartData.totalwalletsCreatedMetric) + "% WoW";
    metrics.walletsCreatedDailyMetric.status = getPercentageChange(chartData.walletsCreatedMetric)+ "% WoW%";

    metrics.userOpMetric.data = chartData.userOpMetric.slice(-dataSize);
    metrics.totalFeeCollectedMetric.data = chartData.totalFeeCollectedMetric.slice(-dataSize);
    metrics.totalwalletsCreatedMetric.data = chartData.totalwalletsCreatedMetric.slice(-dataSize);
    metrics.walletsCreatedDailyMetric.data = chartData.walletsCreatedMetric.slice(-dataSize);

    metrics.userOpMetric.labels = chartData.daySinceEpoch.slice(-dataSize).map((daySinceEpoch) => getDate(daySinceEpoch));
    metrics.totalFeeCollectedMetric.labels = chartData.daySinceEpoch.slice(-dataSize).map((daySinceEpoch) => getDate(daySinceEpoch));
    metrics.totalwalletsCreatedMetric.labels = chartData.daySinceEpoch.slice(-dataSize).map((daySinceEpoch) => getDate(daySinceEpoch));
    metrics.walletsCreatedDailyMetric.labels = chartData.daySinceEpoch.slice(-dataSize).map((daySinceEpoch) => getDate(daySinceEpoch));

    return { chartData, metrics };
};

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<{ width: number | null; height: number | null }>({
        width: null,
        height: null,
    });
    const hasWindow = typeof window !== 'undefined';

    useEffect(() => {
        function getWindowDimensions() {
            const { innerWidth: width, innerHeight: height } = window;
            return {
                width,
                height,
            };
        }

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        if (typeof window !== 'undefined') {
            setWindowDimensions(getWindowDimensions());
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
    return windowDimensions;
}
