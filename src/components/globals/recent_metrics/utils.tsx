import { DailyMetric } from "@/components/common/apiCalls/jiffyApis";
import { getDate, getFee } from "@/components/common/utils";
// Please consult @lazycoder1  / Gautam Sabhahit as to what is happening here XD 
export interface ChartData {
  userOpMetric: number[]
  bundleMetric: number[]
  walletsCreatedMetric: number[]
  totalFeeCollectedMetric: number[]
  daySinceEpoch: number[]
}

export const prepareDayWiseData = (dailyMetrics: DailyMetric[], dataSize: number) => {
  const todayDaySinceEpoch: number = Math.floor(Date.now() / 86400000);
  let chartData: ChartData = {
    userOpMetric: [],
    bundleMetric: [],
    walletsCreatedMetric: [],
    totalFeeCollectedMetric: [],
    daySinceEpoch: []
  }
  const dailyData: { [key: string]: DailyMetric } = {}
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
      daySinceEpoch: (todayDaySinceEpoch - i).toString()
    }
  }
  for (let i = 0; i < dailyMetrics.length; i++) {
    dailyData[dailyMetrics[i].daySinceEpoch] = dailyMetrics[i]
  }
  for (let i = dataSize - 1; i >= 0; i--) {  // The DailyData is ordered from newest to oldest, we want the other way around when displaying the chart
    chartData.userOpMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].userOpsDaily));
    chartData.bundleMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].bundleDaily));
    chartData.walletsCreatedMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].walletsCreatedDaily));
    chartData.totalFeeCollectedMetric.push(parseInt(dailyData[todayDaySinceEpoch - i].gasCostCollectedDaily));
    chartData.daySinceEpoch.push(todayDaySinceEpoch - i)
  }
  return chartData
}



const getPercentageChange = (numberArray: number[]) => {
  // calculate the different between the first half and second half
  const firstHalf = numberArray.slice(0, numberArray.length / 2);
  const firstHalfSum = getSum(firstHalf)
  const secondHalf = numberArray.slice(-numberArray.length / 2);
  const secondHalfSum = getSum(secondHalf)
  if (firstHalfSum == 0) return 'NaN'
  const percentageChange = ((secondHalfSum - firstHalfSum) / firstHalfSum) * 100;
  return percentageChange.toFixed(1).toString();
}


const getSum = (numberArray: number[]) => {
  ;
  const sum = numberArray.reduce((a, b) => a + b, 0);
  return sum;
}

export const prepareChartDataAndMetrics = (dailyMetrics: DailyMetric[], metrics: any, dataSize: number, network: string) => {
  // This is the problem, the daily metric chart will not be consistent. For the days that there are no 
  // user operations, the data point for that day will not exist. So we are creating an empty dailyData object will all the days.
  // and later populating it with the daily metric. Then creating a list out of it. 
  let dataPointSizeIdx = 0;
  let chartData: ChartData = prepareDayWiseData(dailyMetrics, dataSize);
  let feeString: string = getFee(getSum(chartData.totalFeeCollectedMetric.slice(-dataSize / 2)), network);

  metrics.userOpMetric.value = getSum(chartData.userOpMetric.slice(-dataSize / 2));
  metrics.totalFeeCollectedMetric.value = feeString
  metrics.bundleMetric.value = getSum(chartData.bundleMetric.slice(-dataSize / 2));
  metrics.walletsCreatedMetric.value = getSum(chartData.walletsCreatedMetric.slice(-dataSize / 2))

  metrics.userOpMetric.status = getPercentageChange(chartData.userOpMetric);
  metrics.totalFeeCollectedMetric.status = getPercentageChange(chartData.totalFeeCollectedMetric)
  metrics.bundleMetric.status = getPercentageChange(chartData.bundleMetric);
  metrics.walletsCreatedMetric.status = getPercentageChange(chartData.walletsCreatedMetric);

  metrics.userOpMetric.data = chartData.userOpMetric.slice(-dataSize);
  metrics.totalFeeCollectedMetric.data = chartData.totalFeeCollectedMetric.slice(-dataSize);
  metrics.bundleMetric.data = chartData.bundleMetric.slice(-dataSize);
  metrics.walletsCreatedMetric.data = chartData.walletsCreatedMetric.slice(-dataSize);

  metrics.userOpMetric.labels = chartData.daySinceEpoch.slice(-dataSize).map((daySinceEpoch) => getDate(daySinceEpoch));
  metrics.totalFeeCollectedMetric.labels = chartData.daySinceEpoch.slice(-dataSize).map((daySinceEpoch) => getDate(daySinceEpoch));
  metrics.bundleMetric.labels = chartData.daySinceEpoch.slice(-dataSize).map((daySinceEpoch) => getDate(daySinceEpoch));
  metrics.walletsCreatedMetric.labels = chartData.daySinceEpoch.slice(-dataSize).map((daySinceEpoch) => getDate(daySinceEpoch));

  return { chartData, metrics };
}
