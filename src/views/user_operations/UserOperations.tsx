import Footer from "@/components/globals/footer/Footer";
import Navbar from "@/components/globals/navbar/Navbar";
import RecentMetrics from "@/components/globals/recent_metrics/RecentMetrics";
import React, {useState, useEffect} from "react";
import Table, {tableDataT} from "@/components/common/table/Table";
import Pagination from "@/components/common/table/Pagination";
import table_data from "./table_data.json";

function UserOperations() {
  const [rows, setRows] = useState<rows>([]);
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet');

  return (
    <div className="">
      <Navbar searchbar />
      <section className="py-10">
        <div className="container">
          <h1 className="font-bold text-3xl">User Operations</h1>
        </div>
      </section>
      <RecentMetrics selectedNetwork={selectedNetwork}/>
      <section className="mb-10">
        <div className="container">
          <div>
            <Table {...(table_data as tableDataT)} />
            <Pagination />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UserOperations;
