import Footer from "@/components/globals/footer/Footer";
import Navbar from "@/components/globals/navbar/Navbar";
import RecentMetrics from "@/components/globals/recent_metrics/RecentMetrics";
import React, { useEffect, useState } from "react";
import Table, { tableDataT } from "@/components/common/table/Table";
import Pagination from "@/components/common/table/Pagination";
import table_data from "./table_data.json";

function UserOperations() {
  const availableTable = {
    ...table_data,
    rows: table_data.rows.slice(1 - 1, parseInt("10")),
  };
  const [table, setTable] = useState<tableDataT>(availableTable as tableDataT);

  return (
    <div className="">
      <Navbar searchbar />
      <section className="py-10">
        <div className="container">
          <h1 className="font-bold text-3xl">User Operations</h1>
        </div>
      </section>
      <RecentMetrics />
      <section className="mb-10">
        <div className="container">
          <div>
            <Table {...table} />
            <Pagination setTable={setTable} table={table_data as tableDataT} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UserOperations;
