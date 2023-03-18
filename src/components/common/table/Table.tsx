import Chip, {ChipProps} from "@/components/common/chip/Chip";
import React from "react";
import Token from "@/components/common/Token";
import Caption, {CaptionProps} from "./Caption";

export interface tableDataT {
  caption: CaptionProps;
  columns: {
    name: string;
    sort: boolean;
  }[];
  rows: {
    token?: {
      text: string;
      icon: string;
    };
    ago?: string;
    sender?: string;
    target?: string;
    fee?: {
      value: string;
      gas: ChipProps;
    };
    userOps?: string;
  }[];
}

function Table(props: tableDataT) {
  const {caption, columns, rows} = props;

  return (
    <div className="">
      <Caption icon={caption.icon}>{caption.children}</Caption>
      <div>
        <table className="w-full text-md bg-white shadow-200 border border-dark-100">
          <thead>
            <tr>
              {columns.map(({name, sort}, key) => (
                <th
                  key={key}
                  className={`py-3.5 px-4 border-b border-dark-100 group ${
                    columns.length <= 3 ? "first:w-[55%]" : ""
                  }`}
                >
                  <div
                    role={sort ? "button" : undefined}
                    className={`flex items-center gap-2.5 ${
                      columns.length <= 3 ? "group-last:justify-end" : ""
                    }`}
                  >
                    <span>{name}</span>
                    {sort && <img src="/images/span.svg" alt="" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ago, fee, sender, target, token, userOps}, index) => (
              <tr
                key={index}
                className="[&_td]:border-b [&_td]:border-dark-100 [&_td]:py-3.5 [&_td]:px-4 odd:bg-dark-25 hover:bg-dark-25"
              >
                {token && (
                  <td className="">
                    <Token {...token} />
                  </td>
                )}

                {ago && (
                  <td className="">
                    <span className="tracking-normal">{ago}</span>
                  </td>
                )}
                {userOps && (
                  <td className="">
                    <span className="text-blue-200 text-right block">
                      {userOps}
                    </span>
                  </td>
                )}

                {sender && (
                  <td className="">
                    <Token text={sender} />
                  </td>
                )}

                {target && (
                  <td className="">
                    <Token text={target} />
                  </td>
                )}

                {fee && (
                  <td className="">
                    <div className="flex items-center justify-end text-rgiht gap-2">
                      <span>{fee.value}</span>
                      <Chip
                        variant="outlined"
                        color={fee.gas.color as ChipProps["color"]}
                      >
                        {fee.gas.children}
                      </Chip>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
