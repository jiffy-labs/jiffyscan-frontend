import Chip, {ChipProps} from "@/components/common/chip/Chip";
import React from "react";

interface tableDataT {
  columns: {
    name: string;
    sort: boolean;
  }[];
  rows: {
    token: {
      text: string;
      icon: string;
    };
    ago: string;
    sender: string;
    target: string;
    fee: {
      value: string;
      gas: ChipProps;
    };
  }[];
}

const tableData: tableDataT = {
  columns: [
    {name: "Hash", sort: true},
    {name: "Age", sort: true},
    {name: "Sender", sort: false},
    {name: "Target", sort: false},
    {name: "Fee", sort: true},
  ],
  rows: [
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (10).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "ETH",
          color: "info",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (10).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "GWEI",
          color: "success",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (12).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "ETH",
          color: "info",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (13).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "GWEI",
          color: "success",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (10).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "ETH",
          color: "info",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (10).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "GWEI",
          color: "success",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (12).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "ETH",
          color: "info",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (13).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "GWEI",
          color: "success",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (10).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "ETH",
          color: "info",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (10).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "GWEI",
          color: "success",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (12).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "ETH",
          color: "info",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (13).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "GWEI",
          color: "success",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (10).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "ETH",
          color: "info",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (10).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "GWEI",
          color: "success",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (12).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "ETH",
          color: "info",
        },
      },
    },
    {
      token: {
        text: "0x2824r6o923dqe3d7f",
        icon: "/images/icon-container (13).svg",
      },
      ago: "13 min ago",
      sender: "0x2824r6o923dqe3d7f",
      target: "0x2824r6o923dqe3d7f",
      fee: {
        value: "20513",
        gas: {
          children: "GWEI",
          color: "success",
        },
      },
    },
  ],
};

function Table() {
  return (
    <div>
      <div className="mb-2">
        <table className="w-full text-md bg-white shadow-200">
          <thead>
            <tr>
              {[
                {name: "Hash", sort: true},
                {name: "Ago", sort: true},
                {name: "Sender", sort: false},
                {name: "Target", sort: false},
                {name: "Fee", sort: true},
              ].map(({name, sort}) => (
                <th className="py-3.5 px-4 border-b border-dark-100">
                  <SortingButton sort={sort} text={name} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map(({ago, fee, sender, target, token}, index) => (
              <tr
                key={index}
                className="[&_td]:border-b [&_td]:border-dark-100 [&_td]:py-3.5 [&_td]:px-4 odd:bg-dark-25 hover:bg-dark-25"
              >
                <td className="">
                  <Token {...token} />
                </td>
                <td className="">
                  <span className="tracking-normal">{ago}</span>
                </td>
                <td className="">
                  <Token text={sender} />
                </td>
                <td className="">
                  <Token text={target} />
                </td>
                <td className="">
                  <div className="flex items-center justify-end text-rgiht gap-2">
                    <span>{fee.value}</span>
                    <Chip variant="outlined" color={fee.gas.color}>
                      {fee.gas.children}
                    </Chip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center gap-6 text-sm">
        <div className="flex items-center gap-3">
          <p>Rows per page:</p>
          <div className="flex items-center">
            <span>20</span>
            <img src="/images/menu-down.svg" alt="" />
          </div>
        </div>
        <p>1–20 of 10000</p>
        <div>
          {[
            "icon-container (18).svg",
            "icon-container (19).svg",
            "icon-container (20).svg",
            "icon-container (21).svg",
          ].map((icon, key) => (
            <button key={key} type="button">
              <img src={`/images/${icon}`} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;

function SortingButton({text, sort = true}: {text: string; sort?: boolean}) {
  return (
    <div role={sort ? "button" : undefined} className="flex items-center gap-2.5">
      <span>{text}</span>
      {sort && <img src="/images/span.svg" alt="" />}
    </div>
  );
}

export function Token({icon, text, copyIcon}: {icon?: string; text: string; copyIcon?: string}) {
  return (
    <div className="flex items-center gap-2.5">
      {icon && <img src={icon} alt="" />}
      <span className="text-blue-200">{shortenString(text)}</span>
      <button type="button">
        <img src={copyIcon || "/images/Button.svg"} alt="" />
      </button>
    </div>
  );
}

function shortenString(str: string) {
  if (str.length <= 10) {
    return str;
  }

  const firstChars = str.slice(0, 6);
  const lastChars = str.slice(-4);

  return `${firstChars}...${lastChars}`;
}
