import { DailyMetric } from '@/components/common/apiCalls/jiffyApis';
import { getDate, getFee } from '@/components/common/utils';
import { useEffect, useState } from 'react';
// Please consult @lazycoder1  / Gautam Sabhahit as to what is happening here XD
export interface ChartData {
    userOpMetric: number[];
    totalwalletsCreatedMetric: number[];
    activeWalletsDaily: number[];
    totalFeeCollectedMetric: number[];
    daySinceEpoch: number[];
}

export interface ChartDataWeekly {
    userOpMetric: number[];
    totalwalletsCreatedMetric: number[];
    activeWalletsDaily: number[];
    totalFeeCollectedMetric: number[];
    tMinusWeekSinceToday: number[];
}

export const prepareDayWiseData = (dailyMetrics: DailyMetric[], dataSize: number) => {
    const todayDaySinceEpoch: number = Math.floor(Date.now() / 86400000);
    let chartData: ChartData = {
        userOpMetric: [],
        totalwalletsCreatedMetric: [],
        activeWalletsDaily: [],
        totalFeeCollectedMetric: [],
        daySinceEpoch: [],
    };
    const dailyData: { [key: string]: DailyMetric } = {};
    // fill days with 0
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
            activeWalletsDaily: '0',
            activeWallets: [],
            daySinceEpoch: (todayDaySinceEpoch - i).toString(),
            paymasterTotal: '0',
            bundlerTotal: '0',
            factoryTotal: '0',
        };
    }
    // for the days , where we have data. Put the data in the object
    for (let i = 0; i < dailyMetrics.length; i++) {
        dailyData[dailyMetrics[i].daySinceEpoch] = dailyMetrics[i];
    }

    // fill total wallets created metrics for empty days
    let totalWalletsCreatedPointer = 0;
    if (dailyMetrics[0] && parseInt(dailyMetrics[0].daySinceEpoch) <= todayDaySinceEpoch - dataSize)
        totalWalletsCreatedPointer = parseInt(dailyMetrics[0].walletsCreatedTotal);

    for (let i = dataSize - 1; i >= 0; i--) {
        if (parseInt(dailyData[todayDaySinceEpoch - i].walletsCreatedTotal) == 0) {
            dailyData[todayDaySinceEpoch - i].walletsCreatedTotal = totalWalletsCreatedPointer.toString();
        } else {
            totalWalletsCreatedPointer = parseInt(dailyData[todayDaySinceEpoch - i].walletsCreatedTotal);
        }
    }

    //return data for the last 42 days only
    for (let daySinceEpoch in dailyData) {
        if (parseInt(daySinceEpoch) < todayDaySinceEpoch - dataSize) {
            delete dailyData[daySinceEpoch];
        }
    }

    for (let i = dataSize - 1; i >= 0; i--) {
        // The DailyData is ordered from newest to oldest, we want the other way around when displaying the chart
        chartData.userOpMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].userOpsDaily));
        chartData.totalwalletsCreatedMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].walletsCreatedTotal));
        chartData.activeWalletsDaily.push(parseInt(dailyData[todayDaySinceEpoch - i].activeWalletsDaily));
        chartData.totalFeeCollectedMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].gasCostCollectedDaily));
        chartData.daySinceEpoch.push(todayDaySinceEpoch - i);
    }

    return chartData;
};

const getPercentageChange = (numberArray: number[]) => {
    // calculate the different between the first half and second half
    const first = numberArray.slice(-1)[0];
    const second = numberArray.slice(-2,-1)[0];
    if (first == 0) return '0';
    const percentageChange = ((first - second) / second) * 100;
    return percentageChange.toFixed(1).toString();
};

const getSum = (numberArray: number[]) => {
    const sum = numberArray.reduce((a, b) => a + b, 0);
    return sum;
};

const aggregateWeeklyData = (chartData: ChartData): ChartDataWeekly => {
    let weeklyData = {
        userOpMetric: [] as number[],
        totalwalletsCreatedMetric: [] as number[],
        activeWalletsDaily: [] as number[],
        totalFeeCollectedMetric: [] as number[],
        tMinusWeekSinceToday: [] as number[],
    } as ChartDataWeekly;
    for (let i = 0; i < chartData.userOpMetric.length; i++) {
        let weeklyDataPointer = Math.floor(i/7);
        if (i % 7 == 0) {
            weeklyData.userOpMetric.push(chartData.userOpMetric[i]);
            weeklyData.totalwalletsCreatedMetric.push(chartData.totalwalletsCreatedMetric[i]);
            weeklyData.activeWalletsDaily.push(chartData.activeWalletsDaily[i]);
            weeklyData.totalFeeCollectedMetric.push(chartData.totalFeeCollectedMetric[i]);
            weeklyData.tMinusWeekSinceToday.push(weeklyDataPointer);
        } else {
            weeklyData.userOpMetric[weeklyDataPointer] += chartData.userOpMetric[i];
            weeklyData.totalwalletsCreatedMetric[weeklyDataPointer] += chartData.totalwalletsCreatedMetric[i];
            weeklyData.activeWalletsDaily[weeklyDataPointer] += chartData.activeWalletsDaily[i];
            weeklyData.totalFeeCollectedMetric[weeklyDataPointer] += chartData.totalFeeCollectedMetric[i];
        }
    }
    return weeklyData;
}


export const prepareChartDataAndMetrics = (dailyMetrics: DailyMetric[], metrics: any, dataSize: number, network: string) => {
    // This is the problem, the daily metric chart will not be consistent. For the days that there are no
    // user operations, the data point for that day will not exist. So we are creating an empty dailyData object will all the days.
    // and later populating it with the daily metric. Then creating a list out of it.
    let chartData: ChartData = prepareDayWiseData(dailyMetrics, dataSize);
    let weeklyData: ChartDataWeekly = aggregateWeeklyData(chartData);
    
    metrics.userOpMetric.data = weeklyData.userOpMetric;
    metrics.totalFeeCollectedMetric.data = weeklyData.totalFeeCollectedMetric.map((value) => {
        // if (value == 0) return 0;
        // else if (value < 10 ** 6) return value / 10 ** 9;
        // else if (value < 10 ** 9) return value / 10 ** 12; 
        // else if (value < 10 ** 12) return value / 10 ** 15; 
        // else if (value < 10 ** 15) return value / 10 ** 15; 
        return value / 10 ** 18;
    });
    metrics.totalwalletsCreatedMetric.data = getDataForEvery7Days(chartData.totalwalletsCreatedMetric);
    metrics.activeWalletsDailyMetric.data = weeklyData.activeWalletsDaily;

    let feeString = getFee(metrics.totalFeeCollectedMetric.data.slice(-1)[0], network);
    metrics.userOpMetric.value = weeklyData.userOpMetric.slice(-1)[0];
    metrics.totalFeeCollectedMetric.value = parseFloat(feeString.value as string).toFixed(5).toString(); // apply the value and symbol both
    metrics.totalwalletsCreatedMetric.value = chartData.totalwalletsCreatedMetric.slice(-1)[0];
    metrics.activeWalletsDailyMetric.value = weeklyData.activeWalletsDaily.slice(-1)[0];

    metrics.userOpMetric.status = getPercentageChange(weeklyData.userOpMetric) + '% WoW';
    metrics.totalFeeCollectedMetric.status = getPercentageChange(weeklyData.totalFeeCollectedMetric) + '% WoW';
    metrics.totalwalletsCreatedMetric.status = getPercentageChange(weeklyData.totalwalletsCreatedMetric) + '% WoW';
    metrics.activeWalletsDailyMetric.status = getPercentageChange(weeklyData.activeWalletsDaily) + '% WoW';

    const totalWeeks = weeklyData.tMinusWeekSinceToday.length;
    const labels = getWeeklyLabels(totalWeeks);
    metrics.userOpMetric.labels = labels;
    metrics.totalFeeCollectedMetric.labels = labels;
    metrics.totalwalletsCreatedMetric.labels = labels;
    metrics.activeWalletsDailyMetric.labels = labels;

    return { chartData, metrics };
};

const getWeeklyLabels = (totalWeeks: number): string[] => {
    let labels = [];
    let dateIndex = new Date();
    for (let i = 0; i < totalWeeks; i++) {
        labels.push(dateIndex.toDateString());
        dateIndex = new Date(dateIndex.setDate(dateIndex.getDate() - 7));
    }
    return labels.reverse();
}

const getDataForEvery7Days = (data: number[]): number[] => {
    const reversedData = data.reverse();
    const returnData = reversedData.filter((value, idx) => {if (idx % 7 == 0) return true}).reverse();
    data.reverse(); 
    return returnData;
}

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
