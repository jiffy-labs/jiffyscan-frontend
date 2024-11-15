import Chip, { ChipProps } from '@/components/common/chip/Chip';
import React, { useEffect, useState } from 'react';
import Token, { TokenType } from '@/components/common/Token';
import Caption, { CaptionProps } from '../Caption';
import ScrollContainer from 'react-indiana-drag-scroll';
import useWidth from '@/hooks/useWidth';
import { getCurrencySymbol } from '../utils';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton-2';
import Status from '../status/Status';
import { POWERED_BY_LOGO_MAP } from '../constants';
// import Skeleton from '@/components/Skeleton';
import { useRouter } from 'next/router';
import { useTheme } from '@/context/ThemeContext';

export interface tableDataTCollection {
    [key: string]: tableDataT;
}

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
        target?: string[];
        fee?: fee;
        userOps?: string;
        status?: Boolean;
        created?: string;
        keys?: string;
        account?: TokenType;
        count?: string;
        poweredBy?: string;
    }[];
    loading: boolean;
    onRowClick?: (idx: number) => void;
    hideHeader?: boolean;
}

export interface fee {
    value: string | { hex: string; type: string };
    gas?: {
        children: string;
        color: string;
    };
    component?: React.ReactNode;
}

function Table(props: tableDataT) {
    const { rows, columns, caption, onRowClick, hideHeader } = props;
    const [sortedRows, setSortedRows] = useState(rows);
    const [sortOrder, setSortOrder] = useState('asc');
    const width = useWidth();
    const router = useRouter(); // Get current route information
    const isHomepage = router.pathname === '/'; // Check if it's the homepage
    const { isDarkMode } = useTheme(); // Access theme context

    let skeletonCards = Array(5).fill(0);

    const convertAgoToNumber = (ago: string): number => {
        if (ago.includes('an')) return 1;
        const [value, unit] = ago.split(' ');
        switch (unit) {
            case 'hour':
            case 'hours':
                return parseInt(value);
            default:
                return Number.MAX_SAFE_INTEGER;
        }
    };

    const sortRowsAscending = (rows: tableDataT['rows']): typeof rows => {
        return [...rows].sort((a, b) => convertAgoToNumber(a.ago!) - convertAgoToNumber(b.ago!));
    };

    const sortRowsDescending = (rows: tableDataT['rows']): typeof rows => {
        return [...rows].sort((a, b) => convertAgoToNumber(b.ago!) - convertAgoToNumber(a.ago!));
    };

    const handleSort = () => {
        const data = sortOrder === 'asc' ? sortRowsAscending(sortedRows) : sortRowsDescending(sortedRows);
        setSortedRows(data);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    useEffect(() => {
        setSortedRows(rows);
    }, [rows]);
    useEffect(() => {
        setSortedRows(rows);
    }, [rows]);

    const currentPath = router.pathname;
    return (
        <div className="w-full shadow-md rounded-lg">
            {/* {!hideHeader && caption?.text && (
                <Caption icon={caption?.icon!} text={caption?.text}>
                    {caption?.children}
                </Caption>
            )} */}
            <ScrollContainer className={`rounded-b-lg border border-[#D7DAE0] dark:border-[#444444] ${!isHomepage?'rounded-t-lg':''}`}>
                <div className="">
                    <table className={`w-full bg-white  text-md shadow-200 ${!props.loading ? 'md:table-fixed' : ''} ${!isHomepage? 'dark:bg-[#1F202B] ':'dark:bg-[#1D1E1F]'}`}>
                        {/* Table head */}
                        <thead className='dark:text-[#ADB0BC]'>
                            <tr>
                                {columns?.map(({ name, sort }, key) =>
                                    // Conditionally render 'target' column only if not on the homepage
                                    name === 'TARGET' && isHomepage ? null : (
                                        <th
                                            key={key}
                                            className={`${!isHomepage? 'dark:bg-[#191A23]': ''} py-4 px-4 border-b dark:border-[#444444] font-gsans dark:text-[#BCBFCC] text-[#646D8F] text-md tracking-wide font-medium bg-[#F0F1F5] dark:bg-[#19191A] border-[#D7DAE0] text-center`}
                                        >
                                            <div
                                                role={sort ? 'button' : undefined}
                                                className="flex items-center gap-2.5 justify-center"
                                                onClick={() => sort && handleSort()}
                                            >
                                                <span>{name}</span>
                                            </div>
                                        </th>
                                    ),
                                )}
                            </tr>
                        </thead>

                        {/* Loading state */}
                        {props.loading ? (
                            <tbody>
                                {skeletonCards.map((index: number) => {
                                    return (
                                        <>
                                            <tr>
                                                <td colSpan={5}>
                                                    {/* @ts-ignore */}
                                                    <div className={`h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`} />
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        ) : (
                            <tbody>
                                {sortedRows?.map(
                                    ({ ago, fee, sender, target, token, userOps, status, count, poweredBy, created, keys }, index) => (
                                        <tr
                                            key={index}
                                            className={` border-b border-[#D7DAE0] dark:border-[#444444] dark:bg-[#1D1E1F] odd:bg-dark-25 hover:bg-dark-25 text-center font-gsans ${!isHomepage? 'dark:bg-[#1F202B]': ''}`}
                                        >
                                            {/* Token column */}
                                            {token && (
                                                <td
                                                className={`py-3 px-4 ${
                                                    !isHomepage &&
                                                    currentPath !== '/recentUserOps' &&
                                                    currentPath !== '/bundler' &&
                                                    (currentPath === '/recentBundles' || currentPath === '/paymasters'|| currentPath === '/bundlers' )
                                                        ? 'pl-24'
                                                        : 'pl-4'
                                                } ${(currentPath === '/factories') ? 'pl-48' : ''}`}
                                            >
                                                <Token {...token} />
                                            </td>
                                            )}

                                            {/* Ago/status column */}
                                            {ago && (
                                                <td
                                                    className={`py-3 px-12 text-[#20294C] dark:text-[#DADEF1] ${
                                                        !isHomepage&& currentPath === '/recentBundles' ? 'pl-32' : ''
                                                    }`}
                                                >
                                                    {status === true ? (
                                                        <Status status="success" ago={ago} />
                                                    ) : status === false ? (
                                                        <Status status="failure" ago={ago} />
                                                    ) : (
                                                        <span>{ago}</span>
                                                    )}
                                                </td>
                                            )}

                                            {/* User operations column */}
                                            {userOps && (
                                                <td className="py-3 px-4 text-[#20294C] dark:text-[#DADEF1]">
                                                    <span>{userOps}</span>
                                                </td>
                                            )}

                                            {/* Keys column */}
                                            {keys && (
                                                <td className="py-3 px-4">
                                                    <Token text={keys} type="address" eyes />
                                                </td>
                                            )}

                                            {/* Sender column */}
                                            {sender && (
                                                <td className="py-3 px-4 pl-8 text-left">
                                                    <Token text={sender} type="address" />
                                                </td>
                                            )}

                                            {/* Conditionally render 'target' field only if not on the homepage */}
                                            {!isHomepage && target && (
                                                <td className="py-3 px-2 pl-[64px] text-left">
                                                    {target.length > 0 &&
                                                        target.map((item, index) => {
                                                            return <Token key={index} text={item} type="address" />;
                                                        })}
                                                </td>
                                            )}

                                            {/* Fee column */}
                                            {fee && (
                                                <td className="py-3 px-4 text-[#20294C] dark:text-[#DADEF1]">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {fee.value ? (
                                                            <span>
                                                                {typeof fee.value === 'string' ? fee.value : parseInt(fee.value.hex)}
                                                            </span>
                                                        ) : (
                                                            'Unavailable'
                                                        )}
                                                        {fee.gas && <span>{fee.gas.children}</span>}
                                                        {fee.component && fee.component}
                                                    </div>
                                                </td>
                                            )}

                                            {/* Created column */}
                                            {created && (
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-center gap-2">{created}</div>
                                                </td>
                                            )}
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        )}
                    </table>
                </div>
            </ScrollContainer>
        </div>
    );
}

export default Table;
