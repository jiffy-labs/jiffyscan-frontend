import Chip from "@/components/common/chip/Chip";
import InfoButton from "@/components/common/InfoButton";
import React from "react";
import recentMetrics from "./recent_metrics.json";
// import ScrollContainer from "react-indiana-drag-scroll";

function RecentMetrics() {
  return (
    <main className="mb-10">
      <div className="container">
        <div className="flex justify-between items-center gap-3 md:gap-10 py-2 mb-4">
          <div className="flex items-center gap-2 flex-grow">
            <img src="/images/cube-unfolded.svg" alt="" />
            <b className="font-bold text-lg">Recent Metrics</b>
            <InfoButton />
          </div>
          <div className="flex items-center gap-1">
            <Chip startIcon="/images/icon-container (4).svg">Goerli</Chip>
            <div className="hidden md:flex items-center gap-1 ">
              <Chip color="white" startIcon="/images/icon-container (5).svg">
                Mumbai
              </Chip>
              <Chip color="white" startIcon="/images/icon-container (6).svg">
                Optimism Goerli
              </Chip>
            </div>
            <Chip color="white" endIcon="/images/icon-container (7).svg">
              More
            </Chip>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-4 gap-2">
            {recentMetrics.map(({id, status, title, value}) => (
              <div
                className="p-4 rounded border border-dark-200 bg-white shadow-200"
                key={id}
              >
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
  );
}

export default RecentMetrics;
