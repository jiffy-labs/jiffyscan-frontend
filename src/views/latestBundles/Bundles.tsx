import Footer from "@/components/globals/footer/Footer";
import Navbar from "@/components/globals/navbar/Navbar";
import RecentMetrics from "@/components/globals/recent_metrics/RecentMetrics";
import React, { useEffect, useState } from "react";
import Table, { tableDataT } from "@/components/common/table/Table";
import Pagination from "@/components/common/table/Pagination";
import table_data from "./table_data.json";
import { NETWORK_LIST, NETWORK_ICON_MAP } from "@/components/common/constants";
import { getCurrencySymbol, getTimePassed } from "@/components/common/utils";
import { getLatestBundles } from "@/components/common/apiCalls/jiffyApis";

function UserOperations() {
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORK_LIST[0].key);
  const [latestBundlesTable, setLatestBundlesTable] = useState<tableDataT>(table_data as tableDataT);

  useEffect (() => {
    refreshUserOpsTable(selectedNetwork);
  }, [selectedNetwork]);
  
  const refreshUserOpsTable = async (network: string) => {
    const bundles = await getLatestBundles(network, 10, 0);
    let newRows = [] as tableDataT["rows"];
    bundles.forEach(bundle => {
      newRows.push({
        "token": {
          "text": bundle.transactionHash,
          "icon": NETWORK_ICON_MAP[network]
        },
        "ago": getTimePassed(bundle.timestamp),
        "userOps": bundle.userOpsLength+" ops"
      })
    });
    setLatestBundlesTable({...latestBundlesTable, rows: newRows.slice(0,10)});
  }

  return (
    <div className="">
      <Navbar searchbar />
      <section className="py-10">
        <div className="container">
          <h1 className="font-bold text-3xl">User Operations</h1>
        </div>
      </section>
      <RecentMetrics selectedNetwork={selectedNetwork} handleNetworkChange={setSelectedNetwork}/>
      <section className="mb-10">
        <div className="container">
          <div>
            <Table {...latestBundlesTable} />
            {/* <Pagination setTable={setTable} table={table_data as tableDataT} /> */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UserOperations;
