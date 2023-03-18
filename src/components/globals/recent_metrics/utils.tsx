import { DailyMetric } from "@/components/common/apiCalls/jiffyApis";

export interface ChartData {
    userOpMetric: number[]
    bundleMetric: number[]
    walletsCreatedMetric: number[]
    totalFeeCollectedMetric: number[]
}

export const prepareDayWiseData  = (dailyMetrics: DailyMetric[], dataSize: number) => {
    const todayDaySinceEpoch: number = Math.floor(Date.now() / 86400000);
    let chartData: ChartData = {
      userOpMetric: [],
      bundleMetric: [],
      walletsCreatedMetric: [],
      totalFeeCollectedMetric: []
    }
    const dailyData: { [key: string]: DailyMetric } = {}
    for (let i = 0; i < dataSize; i++) {
      dailyData[todayDaySinceEpoch - i] = {
        userOpCounter: '0',
        bundleCounter: '0',
        walletsCreated: '0',
        totalFeeCollected: '0',
        daySinceEpoch: (todayDaySinceEpoch - i).toString()
      }
    }
    console.log('dailyData',dailyData)
    for (let i = 0; i < dailyMetrics.length; i++) {
      dailyData[dailyMetrics[i].daySinceEpoch] = dailyMetrics[i]
    }
    for (let i = dataSize - 1; i >= 0; i--) {  // The DailyData is ordered from newest to oldest, we want the other way around when displaying the chart
      chartData.userOpMetric.push(parseInt(dailyData[todayDaySinceEpoch-i].userOpCounter));
      chartData.bundleMetric.push(parseInt(dailyData[todayDaySinceEpoch-i].bundleCounter));
      chartData.walletsCreatedMetric.push(parseInt(dailyData[todayDaySinceEpoch-i].walletsCreated));
      chartData.totalFeeCollectedMetric.push(parseInt(dailyData[todayDaySinceEpoch-i].totalFeeCollected));
    }
    return chartData
  }



const getPercentageChange = (numberArray: number[]) => {
    // calculate the different between the first half and second half
    const firstHalf = numberArray.slice(0, numberArray.length/2);
    const firstHalfSum = getSum(firstHalf)
    const secondHalf = numberArray.slice(-numberArray.length/2);
    const secondHalfSum = getSum(secondHalf)
    if (firstHalfSum == 0) return 'NaN'
    const percentageChange = ((secondHalfSum - firstHalfSum) / firstHalfSum) * 100;
    return percentageChange.toFixed(1).toString();
  }
  
  
  const getSum = (numberArray: number[]) => {;
    const sum = numberArray.reduce((a, b) => a + b, 0);
    return sum;
  }
  
  export const prepareChartDataAndMetrics = (dailyMetrics: DailyMetric[], metrics: any, dataSize: number) => {
    // This is the problem, the daily metric chart will not be consistent. For the days that there are no 
    // user operations, the data point for that day will not exist. So we are creating an empty dailyData object will all the days.
    // and later populating it with the daily metric. Then creating a list out of it. 
    let dataPointSizeIdx = 0;
    let chartData: ChartData = prepareDayWiseData(dailyMetrics, dataSize);
  
    metrics[0].value = getSum(chartData.userOpMetric.slice(-dataSize/2));
    metrics[1].value = getSum(chartData.totalFeeCollectedMetric.slice(-dataSize/2))
    metrics[2].value = getSum(chartData.bundleMetric.slice(-dataSize/2));
    metrics[3].value = getSum(chartData.walletsCreatedMetric.slice(-dataSize/2));
  
    metrics[0].status = getPercentageChange(chartData.userOpMetric);
    metrics[1].status = getPercentageChange(chartData.totalFeeCollectedMetric)
    metrics[2].status = getPercentageChange(chartData.bundleMetric);
    metrics[3].status = getPercentageChange(chartData.walletsCreatedMetric);

    metrics[0].data = chartData.userOpMetric.slice(-7);
    metrics[1].data = chartData.totalFeeCollectedMetric.slice(-7);
    metrics[2].data = chartData.bundleMetric.slice(-7);
    metrics[3].data = chartData.walletsCreatedMetric.slice(-7);
  
    return { chartData, metrics };
  }