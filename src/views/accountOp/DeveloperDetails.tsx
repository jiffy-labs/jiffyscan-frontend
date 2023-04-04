// import Chip from '@/components/common/chip/Chip';
// import CopyButton from '@/components/common/copy_button/CopyButton';
// import IconText from '@/components/common/IconText';
// import Caption from '@/components/common/table/Caption';
// import { getFee } from '@/components/common/utils';
// import React from 'react';
// import Skeleton from 'react-loading-skeleton-2';
// import { BUTTON_LIST } from './AccountOperation';
// import sx from './usertable.module.sass';
// export default function DeveloperDetails({ tableLoading, skeletonCards1, item, selectedColor, setSelectedColor, open, setOpen }: any) {
//     return (
//         <div>
//             <section className="mt-[48px] px-3 mb-10">
//                 <div className="container px-0">
//                     <div>
//                         <Caption icon={'/images/cube.svg'} text={''}>
//                             Developer Details
//                         </Caption>
//                     </div>
//                     <div className="bg-white overflow-auto rounded shadow-300 ">
//                         {tableLoading ? (
//                             skeletonCards1.map((index: number) => <Skeleton height={55} key={index} />)
//                         ) : (
//                             <table className="min-w-full divide-y divide-gray-600">
//                                 <tbody className="min-w-full divide-y divide-gray-300">
//                                     <tr>
//                                         <td className="py-[14px] px-4 xl:min-w-[205px]">
//                                             <IconText icon={'/images/code-array.svg'}>Value</IconText>
//                                         </td>
//                                         <td className="py-[14px] px-4 whitespace-pre">
//                                             <div className="flex items-center gap-2 flex-1">
//                                                 <span className="text-dark-600 text-sm leading-5">{getFee(item.value!, item.network)}</span>
//                                                 <CopyButton text={getFee(item.value!, item.network)} />
//                                             </div>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className="py-[14px] px-4 xl:min-w-[205px]">
//                                             <IconText icon={'/images/code-array.svg'}>CallData</IconText>
//                                         </td>
//                                         {selectedColor === 'Original' ? (
//                                             <>
//                                                 <td className="whitespace-normal break-all text-black[87%] py-[14px] text-sm leading-5">
//                                                     <td className="py-[14px] px-4 whitespace-pre">
//                                                         <div className="flex my-[2px] mb-2">
//                                                             {BUTTON_LIST.map(({ name, key }, index) => (
//                                                                 <Chip
//                                                                     className={`
//                                                                     text-white table-tab py-[6px] px-3 ${sx.tab}`}
//                                                                     onClick={() => {
//                                                                         setSelectedColor(key);
//                                                                         console.log('SELECTEDCOLOR--------------------->', selectedColor);
//                                                                     }}
//                                                                     key={index}
//                                                                     color={`${selectedColor === key ? 'blue-700' : 'white'}`}
//                                                                     // variant={"outlined"}
//                                                                 >
//                                                                     {name}
//                                                                 </Chip>
//                                                             ))}
//                                                         </div>
//                                                     </td>
//                                                     <div
//                                                         className="overflow-auto flex-1 max-h-[290px]
//                                                                         custom-scroll bg-white border-dark-200 rounded border
//                                                                         ml-[16px]"
//                                                     >
//                                                         {item.input}
//                                                         <CopyButton text={item.input!} />
//                                                     </div>
//                                                 </td>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <td className="py-[14px] px-4 whitespace-pre">
//                                                     <td className="py-[14px] px-4 whitespace-pre">
//                                                         <div className="flex my-[2px] mb-2">
//                                                             {BUTTON_LIST.map(({ name, key }, index) => (
//                                                                 <Chip
//                                                                     className={`
//                                                                     text-white table-tab py-[6px] px-3 ${sx.tab}`}
//                                                                     onClick={() => setSelectedColor(key)}
//                                                                     key={index}
//                                                                     color={`${selectedColor === key ? 'blue-700' : 'white'}`}
//                                                                 >
//                                                                     {name}
//                                                                 </Chip>
//                                                             ))}
//                                                         </div>
//                                                     </td>
//                                                     <div className="flex gap-2">
//                                                         <div className="overflow-auto flex-1 max-h-[290px] custom-scroll bg-white border-dark-200 rounded border">
//                                                             <table className="min-w-full divide-y divide-dark-100">
//                                                                 <thead className="bg-white">
//                                                                     <tr>
//                                                                         <th
//                                                                             scope="col"
//                                                                             className="sticky z-10 top-0 bg-white py-[14px] px-3 text-left text-[12px] font-bold leading-5 text-dark-600"
//                                                                         >
//                                                                             Name
//                                                                         </th>
//                                                                         <th
//                                                                             scope="col"
//                                                                             className="sticky z-10 top-0 bg-white py-[14px] px-3 text-left text-[12px] font-bold leading-5 text-dark-600"
//                                                                         >
//                                                                             Type
//                                                                         </th>
//                                                                         <th
//                                                                             scope="col"
//                                                                             className="sticky z-10 top-0 bg-white py-[14px] px-3 text-left text-[12px] font-bold leading-5 text-dark-600"
//                                                                         >
//                                                                             Date
//                                                                         </th>

//                                                                         <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
//                                                                             <span className="sr-only">Edit</span>
//                                                                         </th>
//                                                                     </tr>
//                                                                 </thead>
//                                                                 <tbody className="divide-y divide-dark-100">
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             sender
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             address
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             <span className="text-dark-700 text-sm leading-5">
//                                                                                 {item.sender}
//                                                                             </span>
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr className="bg-gray-50">
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5 ">
//                                                                             nonce
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5 ">
//                                                                             uint256
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5 ">
//                                                                             {item.nonce}
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             initCode
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             bytes
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             0x
//                                                                         </td>
//                                                                     </tr>
//                                                                     {selectedColor === 'Original' ? (
//                                                                         <tr>
//                                                                             <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                 Input
//                                                                             </td>
//                                                                             <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                 Bytes
//                                                                             </td>
//                                                                             <td className="whitespace-normal break-all text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                 {item.input}
//                                                                             </td>
//                                                                         </tr>
//                                                                     ) : (
//                                                                         ''
//                                                                     )}
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             <div className="flex gap-2 items-center">
//                                                                                 calldata
//                                                                                 <button
//                                                                                     onClick={() => setOpen(!open)}
//                                                                                     className={`${open ? 'rotate-180' : ''}`}
//                                                                                 >
//                                                                                     <IconText icon="/images/arrow-drop.svg" />
//                                                                                 </button>
//                                                                             </div>
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5"></td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             <span className="text-blue-200 text-sm leading-5"></span>
//                                                                         </td>
//                                                                     </tr>
//                                                                     {open && (
//                                                                         <>
//                                                                             <tr>
//                                                                                 <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-3"></td>
//                                                                                 <td className="text-black[87%] text-left text-sm leading-5 py-[14px] px-3">
//                                                                                     target
//                                                                                 </td>
//                                                                                 <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                     {item.target}
//                                                                                 </td>
//                                                                                 <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                     <span className="text-blue-200 text-sm leading-5"></span>
//                                                                                 </td>
//                                                                             </tr>
//                                                                             <tr>
//                                                                                 <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-3"></td>
//                                                                                 <td className="text-black[87%]  text-sm leading-5 py-[14px] px-3">
//                                                                                     value
//                                                                                 </td>
//                                                                                 <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                     {getFee(item.value!, item.network)}
//                                                                                 </td>
//                                                                                 <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                     <span className="text-blue-200 text-sm leading-5"></span>
//                                                                                 </td>
//                                                                             </tr>
//                                                                             <tr>
//                                                                                 <td className="text-black[87%] text-end text-sm leading-5 py-[14px] px-3 "></td>
//                                                                                 <td className="text-black[87%] text-left text-sm leading-5 py-[14px] px-3">
//                                                                                     calldata
//                                                                                 </td>
//                                                                                 <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                     {item.callData}
//                                                                                 </td>
//                                                                                 <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                                     <span className="text-blue-200 text-sm leading-5"></span>
//                                                                                 </td>
//                                                                             </tr>
//                                                                         </>
//                                                                     )}
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             verificationGasLimit
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             uint256
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             {item.verificationGasLimit}
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             preVerificationGas
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             uint256
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             {item.preVerificationGas}
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             maxFeePerGas
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             uint256
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             {getFee(item.maxFeePerGas!, item.network)}
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             maxPriorityFeePerGas
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             uint256
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             {getFee(item.maxPriorityFeePerGas!, item.network)}
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             paymasterAndData
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             uint256
//                                                                         </td>
//                                                                         <td className="whitespace-normal break-all text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             {item.paymasterAndData}
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             signature
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             uint256
//                                                                         </td>
//                                                                         <td className="whitespace-pre text-black[87%] py-[14px] px-3 text-sm leading-5">
//                                                                             {item.signature}
//                                                                         </td>
//                                                                     </tr>
//                                                                 </tbody>
//                                                             </table>
//                                                         </div>
//                                                         <div className="w-[20px]">
//                                                             <CopyButton text="" />
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                             </>
//                                         )}
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

import Footer from '@/components/globals/footer/Footer';
import React, { useEffect, useState } from 'react';
import { tableDataT } from '@/components/common/table/Table';
import { NETWORK_ICON_MAP } from '@/components/common/constants';
import { getFee, getTimePassed, shortenString } from '@/components/common/utils';
import { UserOp } from '@/components/common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';
import { Link } from '@mui/material';
import Skeleton from 'react-loading-skeleton-2';
import Token from '@/components/common/Token';
import Pagination from '@/components/common/table/Pagination';
import CopyButton from '@/components/common/copy_button/CopyButton';
import Caption from '@/components/common/table/Caption';
// import table_data from "./table_data.json"
const DEFAULT_PAGE_SIZE = 10;
const columns = [
    { name: 'Hash', sort: true },
    { name: 'Age', sort: true },
    { name: 'Sender', sort: true },
    { name: 'Target', sort: true },
    { name: 'Fee', sort: true },
];
function DeveloperDetails({ tableLoading, skeletonCards1, item, prevHash }: any) {
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalRows, setTotalRows] = useState(0);
    // const [tableLoading, setTableLoading] = useState(true);
    const [captionText, setCaptionText] = useState('');

    const setPageSize = (size: number) => {
        _setPageSize(size);
        setPageNo(0);
    };
    useEffect(() => {
        setPageNo(0);
        fetchTotalRows();
    }, []);

    const fetchTotalRows = async () => {
        setTotalRows(parseInt(item?.userOpsSenderLength || '0'));
        // setCaptionText(' ' + parseInt(item?.userOpsSenderLength) + ' user operations found');
    };

    return (
        <div className="">
            <div className="container items-center">
                <Caption icon={'/images/cube.svg'} text={'Approx Number of Operations Processed in the selected chain'}>
                    {parseInt(item?.userOpsSenderLength || 0) + ' user operations found'}
                </Caption>
            </div>
            <div className="overflow-auto flex-1 max-h-[290px] custom-scroll container mb-5 bg-white border-dark-200 rounded border mt-[20px]">
                <table className="min-w-full divide-y divide-dark-100">
                    <thead className="bg-white">
                        <tr>
                            {columns.map(({ name, sort }, key) => {
                                return (
                                    <th
                                        key={key}
                                        className={`py-3.5 border-b border-dark-100 group ${
                                            columns.length <= 3 ? 'md:first:wx-[55%]' : ''
                                        }`}
                                    >
                                        <div
                                            role={sort ? 'button' : undefined}
                                            className={`flex items-center gap-2.5 ${columns.length <= 3 ? '' : ''}`}
                                        >
                                            <span>{name}</span>
                                            {name === 'Age' ? sort && <img src="/images/span.svg" alt="" /> : null}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    {tableLoading ? (
                        <tbody>
                            {skeletonCards1.map((index: number) => {
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
                        <tbody className="divide-y divide-dark-100">
                            {item?.userOpsSender?.concat(item?.userOpsTarget).map((item: UserOp, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-black[87%] text-sm leading-5  py-[14px] px-4 text-blue-200 flex">
                                            <img src={NETWORK_ICON_MAP[item.network as string]} alt="" className="h-[20px]" />
                                            <Token text={item.userOpHash} type="userOp" />
                                        </td>
                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                            {item.success === true ? (
                                                <span className="flex items-center px-3 py-px  gap-2 rounded-full">
                                                    <img src="/images/Success.svg" alt="" />
                                                    {getTimePassed(item.blockTime!)}
                                                </span>
                                            ) : (
                                                <>
                                                    <span className="flex items-center px-3 py-px  gap-2 rounded-full">
                                                        <img src="/images/failed.svg" alt="" />
                                                        {getTimePassed(item.blockTime!)}
                                                    </span>
                                                </>
                                            )}
                                        </td>
                                        <td
                                            className={`${
                                                prevHash === item.sender ? `text-dark-600` : `text-blue-200`
                                            } whitespace-pre text-black[87%] py-[14px] text-sm leading-5 gap-2.5`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <Link
                                                    href={`/address/${item.sender}?network=${item.network ? item.network : ''}`}
                                                    className="text-blue-200"
                                                >
                                                    {shortenString(item.sender)}
                                                </Link>
                                                <CopyButton text={item.sender} />
                                            </div>
                                        </td>
                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                            <span className={`text-blue-200 text-sm leading-5`}>
                                                <Token text={item.target! ? item.target! : ''} type="address" />
                                            </span>
                                        </td>
                                        <td className="whitespace-pre text-black[87%] py-[14px] text-sm leading-5">
                                            <span>{getFee(item.actualGasCost, item.network)}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </div>
            {/* <Pagination
                        // table={useOpsData as UserOp[]}
                        pageDetails={{
                            pageNo,
                            setPageNo,
                            pageSize,
                            setPageSize,
                            totalRows,
                        }}
                    /> */}
            <Footer />
        </div>
    );
}

export default DeveloperDetails;
