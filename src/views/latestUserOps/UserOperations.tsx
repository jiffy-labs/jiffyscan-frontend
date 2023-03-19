import Footer from "@/components/globals/footer/Footer";
import Navbar from "@/components/globals/navbar/Navbar";
import RecentMetrics from "@/components/globals/recent_metrics/RecentMetrics";
import React, { useEffect, useState } from "react";
import Table, { tableDataT, getFee } from "@/components/common/table/Table";
import Pagination from "@/components/common/table/Pagination";
import table_data from "./table_data.json";
import { NETWORK_LIST, NETWORK_ICON_MAP } from "@/components/common/constants";
import { getCurrencySymbol, getTimePassed } from "@/components/common/utils";
import { getLatestUserOps } from "@/components/common/apiCalls/jiffyApis";
import { useConfig } from "@/context/config";

function UserOperations() {
  const {selectedNetwork, setSelectedNetwork} = useConfig()
  const [latestUserOpsTable, setLatestUserOpsTable] = useState<tableDataT>(table_data as tableDataT);
  
  useEffect (() => {
    refreshUserOpsTable(selectedNetwork);
  }, [selectedNetwork]);

  const refreshUserOpsTable = async (network: string) => {
    const userOps = await getLatestUserOps(network, 10, 0);
    let newRows = [] as tableDataT["rows"];
    userOps.forEach(userOp => {
      newRows.push({
        "token": {
          "text": userOp.userOpHash,
          "icon": NETWORK_ICON_MAP[network],
          "type": "userOp"
        },
        "ago": getTimePassed(userOp.blockTime),
        "sender": userOp.sender,
        "target": userOp.target,
        "fee": getFee(userOp.actualGasCost, userOp.network as string)
      })
    });
    setLatestUserOpsTable({...latestUserOpsTable, rows: newRows.slice(0,10)});
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
            <Table {...latestUserOpsTable} />
            {/* <Pagination setTable={setLatestUserOpsTable} table={latestUserOpsTable as tableDataT} /> */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UserOperations;
