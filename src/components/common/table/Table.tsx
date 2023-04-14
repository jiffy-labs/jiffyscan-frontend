import Chip, { ChipProps } from '@/components/common/chip/Chip';
import React, { useEffect, useState } from 'react';
import Token, { TokenType } from '@/components/common/Token';
import Caption, { CaptionProps } from './Caption';
import ScrollContainer from 'react-indiana-drag-scroll';
import useWidth from '@/hooks/useWidth';
import { getCurrencySymbol } from '../utils';
import Skeleton from 'react-loading-skeleton-2';
import Status from '../status/Status';
// import Skeleton from '@/components/Skeleton';

export interface tableDataT {
    caption?: CaptionProps;
    columns: {
        name: string;
        sort: boolean;
    }[];
    rows: {
        token?: TokenType;
        ago?: string;
        sender?: string;
        target?: string;
        fee?: fee;
        userOps?: string;
        status?: Boolean;
    }[];
    loading: boolean;
    onRowClick?: (idx: number) => void;
}

export interface fee {
    value: string;
    gas: {
        children: string;
        color: string;
    };
}

function Table(props: tableDataT) {
    const { rows, columns, caption, onRowClick } = props;
    const width = useWidth();

    let skeletonCards = Array(5).fill(0);
    return (
        <div className="">
            <Caption icon={caption?.icon!} text={caption?.text}>
                {caption?.children}
            </Caption>
            <ScrollContainer>
                <div style={width < 768 ? { minWidth: columns?.length * 160 } : {}}>
                    <table className="w-full text-md bg-white shadow-200 border border-dark-100"> 
                        <thead>
                            <tr>
                                {columns?.map(({ name, sort }, key) => {
                                    return (
                                        <th
                                            key={key}
                                            className={`py-3.5 px-4 border-b border-dark-100 group ${
                                                columns.length <= 3 ? 'md:first:wx-[55%]' : ''
                                            }`}
                                        >
                                            <div
                                                role={sort ? 'button' : undefined}
                                                className={`flex items-center gap-2.5 ${
                                                    columns.length <= 3 ? 'group-last:justify-end' : ''
                                                }`}
                                            >
                                                <span>{name}</span>
                                                {name === 'Age' ? sort && <img src="/images/span.svg" alt="" /> : null}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        {props.loading ? (
                            <tbody>
                                {skeletonCards.map((index: number) => {
                                    return (
                                        <>
                                            <tr>
                                                <td colSpan={5}>
                                                    <Skeleton height={40} key={index} />
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        ) : (
                            <tbody>
                                {rows?.map(({ ago, fee, sender, target, token, userOps, status }, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="[&_td]:border-b User_Operations_table [&_td]:border-dark-100 [&_td]:py-3.5 [&_td]:px-4 odd:bg-dark-25 hover:bg-dark-25"
                                        >
                                            {token && (
                                                <td className="">
                                                    <Token {...token} /> 
                                                </td>
                                            )}

                                            {ago && (
                                                <td className="">
                                                    {status === true ? (
                                                        <Status status="success" ago={ago} />
                                                    ) : (
                                                      
                                                        <>
                                                            {status === false ? (
                                                                <Status status="failure" ago={ago} />
                                                            ) : (
                                                                <span className="tracking-normal">{ago}</span>)}
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                            {userOps && (
                                                <td className="">
                                                    <span className="text-blue-200 text-right block">{userOps}</span>
                                                </td>
                                            )}

                                            {sender && (
                                                <td className="">
                                                    <Token text={sender} type="address" />
                                                </td>
                                            )}
                                            <td className="">{target && <Token text={target} type="address" />}</td>

                                            {fee && (
                                                <td className="">
                                                    <div className="flex items-center justify-end text-rgiht gap-2">
                                                        <span>{fee.value}</span>
                                                        {fee.gas && (
                                                            <Chip variant="outlined" color={fee.gas.color as ChipProps['color']}>
                                                                {fee.gas.children}
                                                            </Chip>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
            </ScrollContainer>
        </div>
    );
}

export default Table;
