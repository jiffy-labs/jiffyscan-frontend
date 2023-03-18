import Chip, { ChipProps } from "@/components/common/chip/Chip";
import React from "react";
import Token from "@/components/common/Token";
import Caption, { CaptionProps } from "./Caption";
import ScrollContainer from "react-indiana-drag-scroll";
import useWidth from "@/hooks/useWidth";
import { getCurrencySymbol } from "../utils";

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
    fee?: fee;
    userOps?: string;
  }[];
}

export interface fee 
  {
    value: string;
    gas: ChipProps;
  }

export const getFee = (amount: number, network: string): fee => {
  let gasFee:number = amount
  let fee: fee= {
      value: '0',
      gas: {
          children: getCurrencySymbol(gasFee, network),
          color: "success"
      }
  }
  if (gasFee > 10**13) {
      fee.value = (gasFee / 10**18).toFixed(4).toString()
  } else if (gasFee > 10**9) {
      fee.value = (gasFee / 10**9).toFixed(4).toString()
  } else {
      fee.value = gasFee.toString()
  }
  return fee;
}

function Table(props: tableDataT) {
  const { caption, columns, rows } = props;
  const width = useWidth();

  return (
    <div className="">
      <Caption icon={caption.icon}>{caption.children}</Caption>
      <ScrollContainer>
        <div style={width < 768 ? { minWidth: columns.length * 160 } : {}}>
          <table className="w-full text-md bg-white shadow-200 border border-dark-100">
            <thead>
              <tr>
                {columns.map(({ name, sort }, key) => (
                  <th
                    key={key}
                    className={`py-3.5 px-4 border-b border-dark-100 group ${
                      columns.length <= 3 ? "md:first:wx-[55%]" : ""
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
              {rows.map(({ ago, fee, sender, target, token, userOps }, index) => (
                <tr
                  key={index}
                  className="[&_td]:border-b [&_td]:border-dark-100 [&_td]:py-3.5 [&_td]:px-4 odd:bg-dark-25 hover:bg-dark-25"
                >
                  {token && (
                    <td className="">
                      <Token {...token} type="hash"/>
                    </td>
                  )}

                  {ago && (
                    <td className="">
                      <span className="tracking-normal">{ago}</span>
                    </td>
                  )}
                  {userOps && (
                    <td className="">
                      <span className="text-blue-200 text-right block">{userOps}</span>
                    </td>
                  )}

                  {sender && (
                    <td className="">
                      <Token text={sender} type="address"/>
                    </td>
                  )}

                  {target && (
                    <td className="">
                      <Token text={target} type="address"/>
                    </td>
                  )}

                  {fee && (
                    <td className="">
                      <div className="flex items-center justify-end text-rgiht gap-2">
                        <span>{fee.value}</span>
                        <Chip variant="outlined" color={fee.gas.color as ChipProps["color"]}>
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
      </ScrollContainer>
    </div>
  );
}

export default Table;
