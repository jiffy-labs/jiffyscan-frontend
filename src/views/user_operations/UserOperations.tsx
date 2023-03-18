import Footer from "@/components/globals/footer/Footer";
import Navbar from "@/components/globals/navbar/Navbar";
import RecentMetrics from "@/components/globals/recent_metrics/RecentMetrics";
import React, { useEffect, useState } from "react";
import Table, { tableDataT } from "@/components/common/table/Table";
import Pagination from "@/components/common/table/Pagination";
import table_data from "./table_data.json";
function UserOperations() {
  const [show, setShow] = useState<string>("10");
  const [page, setPage] = useState(1);
  const availableTable = {
    ...table_data,
    rows: table_data.rows.slice(page - 1, parseInt(show)),
  };
  const [table, setTable] = useState<tableDataT>(availableTable as tableDataT);

  const handleShow = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    setShow(value);
    const availableTable = {
      ...table_data,
      rows: table_data.rows.slice(page - 1, parseInt(value)),
    } as tableDataT;
    setTable(availableTable);
  };
  const handlePage = (value: number) => {
    const availableTable = {
      ...table_data,
      rows: table_data.rows.slice((value - 1) * parseInt(show), value * parseInt(show)),
    } as tableDataT;
    setTable(availableTable);
    setPage(value);
  };

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
            <Pagination
              page={page}
              setShow={setShow}
              show={show}
              setTable={setTable}
              handleShow={handleShow}
              table={table_data as tableDataT}
              handlePage={handlePage}
              totalRows={table_data.rows.length}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UserOperations;
