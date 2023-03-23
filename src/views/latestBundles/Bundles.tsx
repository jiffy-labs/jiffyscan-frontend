import Footer from "@/components/globals/footer/Footer";
import Navbar from "@/components/globals/navbar/Navbar";
import RecentMetrics from "@/components/globals/recent_metrics/RecentMetrics";
import React, { useEffect, useState } from "react";
import Table, { tableDataT } from "@/components/common/table/Table";
import Pagination from "@/components/common/table/Pagination";
import table_data from "./table_data.json";
import { NETWORK_LIST, NETWORK_ICON_MAP } from "@/components/common/constants";
import { getCurrencySymbol, getTimePassed } from "@/components/common/utils";
import { getLatestBundles, getDailyMetrics, DailyMetric } from "@/components/common/apiCalls/jiffyApis";
import { useConfig } from "@/context/config";

const METRIC_DATA_POINT_SIZE = 14;
const DEFAULT_PAGE_SIZE = 10;

function UserOperations() {
  const { selectedNetwork, setSelectedNetwork } = useConfig();
  const [latestBundlesTable, setLatestBundlesTable] = useState<tableDataT>({
    rows: []
  });
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalRows, setTotalRows] = useState(0);

  const setPageSize = (size: number) => {
    _setPageSize(size);
    setPageNo(0);
  }

  useEffect(() => {
    fetchTotalRows();
  })

  useEffect(() => {
    refreshUserOpsTable(selectedNetwork, pageSize, pageNo);
  }, [selectedNetwork, pageNo]);

  const fetchTotalRows = async () => {
    const oneDayMetrics = await getDailyMetrics(selectedNetwork, 1);
    let presentDayMetrics;
    if (oneDayMetrics.length > 0) {
      presentDayMetrics = oneDayMetrics[0];
    }
    setTotalRows(parseInt(presentDayMetrics?.bundlesTotal || '0'));
  }

  const refreshUserOpsTable = async (network: string, pageSize: number, pageNo: number) => {
    const bundles = await getLatestBundles(network, pageSize, pageNo);
    let newRows = [] as tableDataT["rows"];
    bundles.forEach(bundle => {
      newRows.push({
        "token": {
          "text": bundle.transactionHash,
          // "icon": NETWORK_ICON_MAP[network],
          // "type": "bundle"
        },
        "ago": getTimePassed(bundle.timestamp),
        "userOps": bundle.userOpsLength + " ops"
      })
    });
    setLatestBundlesTable({ ...latestBundlesTable, rows: newRows.slice(0, 10) });
  }

  return (
    <div className="">
      <Navbar searchbar />
      <section className="py-10">
        <div className="container">
          <h1 className="font-bold text-3xl">User Operations</h1>
        </div>
      </section>
      <RecentMetrics selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork} />
      <section className="mb-10">
        <div className="container">
          <div>
            <Table {...latestBundlesTable} />
            <Pagination
              table={latestBundlesTable as tableDataT} 
              pageDetails={{
                pageNo,
                setPageNo,
                pageSize,
                setPageSize,
                totalRows
              }}
              />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UserOperations;
