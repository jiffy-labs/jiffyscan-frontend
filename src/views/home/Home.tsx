import Button from "@/components/common/Button";
import Table, { tableDataT } from "@/components/common/table/Table";
import Footer from "@/components/globals/footer/Footer";
import Navbar from "@/components/globals/navbar/Navbar";
import RecentMetrics from "@/components/globals/recent_metrics/RecentMetrics";
import React from "react";
import BundlesTable from "./bundles_table.json";
import OperationsTable from "./operations_table.json";
import Searchblock from "./Searchblock";

function Home() {
  return (
    <div>
      <Navbar />
      <section className="py-6">
        <div className="container">
          <h1 className="font-bold text-xl leading-8 md:text-3xl mb-2 md:mb-4">
            The User Operations Explorer
          </h1>
          <div>
            <Searchblock />
          </div>
        </div>
      </section>
      <RecentMetrics />
      <section className="mb-12">
        <div className="container grid-cols-1 md:grid-cols-2 grid gap-10">
          <div>
            <Table {...(BundlesTable as tableDataT)} />
            <div className="mt-4">
              <Button href="/">View all bundles</Button>
            </div>
          </div>
          <div>
            <Table {...(OperationsTable as tableDataT)} />
            <div className="mt-4">
              <Button href="/">View all User operations</Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
