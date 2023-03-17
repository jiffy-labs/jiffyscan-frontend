import Chip from "@/components/common/chip/Chip";
import IconButton from "@/components/common/icon_button/IconButton";
import InfoButton from "@/components/common/InfoButton";
import Footer from "@/components/globals/footer/Footer";
import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";
import Table from "./Table";

const pages = [
  {
    id: 3487,
    name: "Home",
    url: "/",
  },
  {
    id: 4567,
    name: "Blockchain",
    url: "/blockchain",
    dropdown: [],
  },
  {
    id: 3456,
    name: "Developers",
    url: "/bevelopers",
    dropdown: [],
  },
  {
    id: 5647,
    name: "More",
    url: "/more",
    dropdown: [],
  },
];

const recentMetrics = [
  {
    id: 5678,
    title: "Total number of UserOps",
    value: "760.34k",
    status: "20.5",
  },
  {
    id: 3246,
    title: "Total Daily Gas Fee Paid",
    value: "760.34k",
    status: "20.5",
  },
  {
    id: 8675,
    title: "Unique Transacting Wallets",
    value: "760.34k",
    status: "20.5",
  },
  {
    id: 2345,
    title: "New Wallets Created",
    value: "760.34k",
    status: "20.5",
  },
];

function Home() {
  const {pathname} = useRouter();

  return (
    <div className="">
      <nav className="py-3">
        <div className="container justify-between flex items-center gap-8">
          <div className="">
            <Link href="/" className="flex items-end gap-2 text-dark-600 hover:no-underline">
              <img src="/images/Frame 19.svg" alt="" />
              <span className="font-semibold text-xl leading-[1.4]">jiffyscan.xyz</span>
              <span className="text-sm">v0.5</span>
            </Link>
          </div>
          <div className="w-[1px] h-[40px] bg-black/[12%]" />
          <div className="flex-grow flex items-center gap-6">
            {pages.map(({id, name, url, dropdown}) => {
              const current = url === pathname;
              return (
                <Link
                  href={url}
                  key={id}
                  className={`flex items-center gap-1 text-md tracking-[0.25px] underline-offset-[10px] decoration-2 ${
                    current ? "underline" : "hover:no-underline"
                  }`}
                >
                  <span>{name}</span>
                  {dropdown && <img src="/images/icon-container.svg" alt="" />}
                </Link>
              );
            })}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <IconButton icon="/images/icon-container (1).svg" />
              <IconButton icon="/images/icon-container (2).svg" />
            </div>
          </div>
        </div>
      </nav>
      <section className="py-10">
        <div className="container">
          <h1 className="font-bold text-3xl">User Operations</h1>
        </div>
      </section>
      <main className="mb-10">
        <div className="container">
          <div className="flex justify-between items-center gap-10 py-2 mb-4">
            <div className="flex items-center gap-2 flex-grow">
              <img src="/images/cube-unfolded.svg" alt="" />
              <b className="font-bold text-lg">Recent Metrics</b>
              <InfoButton />
            </div>
            <div className="flex items-center gap-1">
              <Chip startIcon="/images/icon-container (4).svg">Goerli</Chip>
              <Chip color="white" startIcon="/images/icon-container (5).svg">
                Mumbai
              </Chip>
              <Chip color="white" startIcon="/images/icon-container (6).svg">
                Optimism Goerli
              </Chip>
              <Chip color="white" endIcon="/images/icon-container (7).svg">
                More
              </Chip>
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-4 gap-2">
              {recentMetrics.map(({id, status, title, value}) => (
                <div className="p-4 rounded border border-dark-200 bg-white shadow-200" key={id}>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{title}</span>
                    <InfoButton />
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/images/icon-container (8).svg" alt="" />
                    <span className="font-bold">{value}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-sm text-dark-500">{status}%</span>
                    <img src="/images/icon-container (9).svg" alt="" />
                  </div>
                  <div>
                    <img className="w-full" src="/images/graphs.svg" alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <section className="mb-10">
        <div className="container">
          <div>
            <div className="flex items-center gap-2 py-2 mb-2">
              <img src="/images/cube.svg" alt="" />
              <span className="font-bold text-lg">More than &gt; 1,892,547,662 transactions found</span>
              <InfoButton />
            </div>
            <div>
              <Table />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
