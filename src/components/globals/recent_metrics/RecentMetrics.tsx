import Chip, {ChipProps} from "@/components/common/chip/Chip";
import InfoButton from "@/components/common/InfoButton";
import React, {useState} from "react";
import recentMetrics from "./recent_metrics.json";
import ScrollContainer from "react-indiana-drag-scroll";

const metrics = [
  {
    id: 49,
    startIcon: [
      "/images/icon-container45.svg",
      "/images/icon-container (4).svg",
    ],
    value: "Goerli",
  },
  {
    id: 50,
    startIcon: [
      "/images/icon-container (5).svg",
      "/images/icon-container (5).svg",
    ],
    value: "Mumbai",
  },
  {
    id: 51,
    startIcon: [
      "/images/icon-container (6).svg",
      "/images/icon-container (6).svg",
    ],
    value: "Optimism Goerli",
  },
  {
    id: 52,
    value: "More",
    endIcon: [
      "/images/icon-container (7).svg",
      "/images/icon-container (28).svg",
    ],
    iconHandle: true,
  },
];

function RecentMetrics() {
  const [metric, setMetris] = useState<number>(0);

  return (
    <main className="mb-10">
      <div className="container">
        <div className="flex justify-between flex-wrap items-center gap-3 md:gap-10 py-2 mb-4">
          <div className="flex items-center gap-2 flex-grow">
            <img src="/images/cube-unfolded.svg" alt="" />
            <b className="font-bold text-lg">Recent Metrics</b>
            <InfoButton />
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {metrics.map(({id, value, endIcon, startIcon}, index) => (
              <Chip
                key={index}
                onClick={() => setMetris(index)}
                endIcon={metric === index ? endIcon?.[1] : endIcon?.[0]}
                startIcon={metric === index ? startIcon?.[1] : startIcon?.[0]}
                color={`${metric === index ? "dark-700" : "white"}`}
              >
                {value}
              </Chip>
            ))}
          </div>
        </div>
        <div className="w-full">
          <ScrollContainer>
            <div className="grid grid-cols-4 gap-2 min-w-[700px]">
              {recentMetrics.map(({id, status, title, value}) => (
                <div
                  className="p-4 rounded border border-dark-200 bg-white shadow-200"
                  key={id}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm leading-[1.3]">{title}</span>
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
          </ScrollContainer>
        </div>
      </div>
    </main>
  );
}

export default RecentMetrics;
