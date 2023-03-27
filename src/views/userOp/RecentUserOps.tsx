import Footer from '@/components/globals/footer/Footer';
import Navbar from '@/components/globals/navbar/Navbar';
import RecentMetrics from '@/components/globals/recent_metrics/RecentMetrics';
import React, { useEffect, useState } from 'react';
import Table, { tableDataT, getFee } from '@/components/common/table/Table';
import Pagination from '@/components/common/table/Pagination';
// import table_data from './';
import { NETWORK_LIST, NETWORK_ICON_MAP } from '@/components/common/constants';
import { getCurrencySymbol, getTimePassed } from '@/components/common/utils';
import { getDailyMetrics, getLatestUserOps } from '@/components/common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';
import { Breadcrumbs, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import sader_icon from '../../../public/images/sader.svg';
import Image from 'next/image';
import CopyButton from '@/components/common/copy_button/CopyButton';
import share_icon from '../../../public/images/share.svg';
import Caption from '@/components/common/table/Caption';
import IconText from '@/components/common/IconText';
import Chip from '@/components/common/chip/Chip';
import sx from './usertable.module.sass';

const DEFAULT_PAGE_SIZE = 10;
export const BUTTON_LIST = [
    {
        name: 'Default View',
        key: 'Default View',
    },
    {
        name: 'UTF-8',
        key: 'UTF-8',
    },
    {
        name: 'Original',
        key: 'Original',
    },

];


function RecentUserOps() {
    // const { selectedNetwork, setSelectedNetwork } = useConfig();
    // const [latestUserOpsTable, setLatestUserOpsTable] = useState<tableDataT>(table_data as tableDataT);
    // const [pageNo, setPageNo] = useState(0);
    // const [pageSize, _setPageSize] = useState(DEFAULT_PAGE_SIZE);
    // const [totalRows, setTotalRows] = useState(0);
    // const [tableLoading, setTableLoading] = useState(true);
    // const [captionText, setCaptionText] = useState('');
    const [selectedColor, setSelectedColor] = useState("#1976D2");

    return (
        <div className="">
            <Navbar searchbar />
            <section className="py-10 px-3">
                <div className="container">
                    <div className="flex flex-row">
                        <Link href="/" className="text-gray-500">
                            <ArrowBackIcon
                                style={{ height: '15px', width: '15px', marginRight: '20px', marginLeft: '10px', marginBottom: '3px' }}
                            />
                        </Link>
                        <Breadcrumbs aria-label="breadcrumb" className="font-['Roboto']">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link underline="hover" color="text.primary" href="/recentUserOps" aria-current="page">
                                All Transactions
                            </Link>
                            <Link underline="hover" color="text.primary" href="/recentUserOps" aria-current="page">
                            0x2824...d7fe
                            </Link>
                        </Breadcrumbs>
                    </div>
                </div>
            </section>
            <section className=' px-3'>
                <div className='container  bg-white rounded shadow-200 px-[16px] py-[12px]'>
                    <h3 className='text-[15px]  leading-[28px] font-bold text-dark-600'>User Operation Hash</h3>
                    <div className='md:flex items-center gap-4 pt-[14px] pb-[2px]'>
                        <div className='flex items-center gap-2'>
                            <img src="/images/ethereum.svg" alt="" />
                            <span className='text-sm font-normal leading-5 text-dark-600'>Goerli</span>
                        </div>
                        <div className='flex items-center break-words gap-2 flex-1'>
                            <span className='text-blue-200 text-sm break-all leading-5'>0x4f175d2c5d6e88bc406c294c505bea41fc17b0b2029b406058a8e17c358e530e</span>
                            <CopyButton text="" />
                            <button className='outline-none focus:outline-none ring-0 focus:ring-0'>
                                <img src="/images/graph.svg" alt="" />
                            </button>
                        </div>
                        <span className='text-bluegrey-300 text-[10px] leading-5 flex items-center gap-2 font-normal'>
                            Power by <img src="/images/pimlico.svg" alt="" />
                        </span>
                    </div>
                </div>
            </section>
            <section className='mt-[48px] px-3'>
                <div className='container px-0'>
                    <div>
                        <Caption icon={'/images/cube.svg'} text={""}>Transaction Details</Caption>
                    </div>
                    <div className='bg-white overflow-auto rounded shadow-300 '>
                        <table className='min-w-full divide-y divide-gray-600'>

                            <tbody className='min-w-full divide-y divide-gray-300'>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/sader.svg'}  >Sender</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex items-center gap-2 flex-1'>
                                            <span className='text-blue-200 text-sm leading-5'>0x4f175d2c5d6e88bc406c294c505bea41fc17b0b2029b406058a8e17c358e530e</span>
                                            <CopyButton text="" />
                                            <button className='outline-none focus:outline-none ring-0 focus:ring-0'>
                                                <img src="/images/share.svg" alt="" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className='py-[14px] px-4 text-right'>
                                        <span className='text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal'>
                                            Power by <img src="/images/pimlico.svg" alt="" />
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/Receiver.svg'}>Receiver</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex items-center gap-2 flex-1'>
                                            <span className='text-blue-200 text-sm leading-5'>0xbdbc5fbc9ca8c3f514d073ec3de840ac84fc6d31</span>
                                            <CopyButton text="" />
                                            <button className='outline-none focus:outline-none ring-0 focus:ring-0'>
                                                <img src="/images/share.svg" alt="" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className='py-[14px] px-4 text-right'>
                                        <span className='text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal'>
                                            Power by <img src="/images/pimlico.svg" alt="" />
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/sader.svg'}  >Block Time</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <span className='text-dark-600 text-sm leading-5'>Sat Mar 04 2023 18:20:00 GMT+0200 (Eastern European Standard Time)</span>
                                    </td>
                                    <td className='py-[14px] px-4 text-right'>

                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/delete.svg'}  >Status</IconText>
                                    </td>

                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex'>

                                            <span className="flex items-center px-3 py-px  gap-2 rounded-full border border-[#4CAF50]">
                                                <img src='/images/Success.svg' alt="" />
                                                <span className="font-normal text-[12px] leading-5 text-dark-600">Success</span>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/delete.svg'} >Operation</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex items-center gap-2 flex-1'>
                                            <span className='text-dark-600 text-sm leading-5'>Custom text (Eg: Context on the operation. Transfer of ETH or ERC20 transfer or Swap on Dex?)</span>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/star.svg'}  >Value</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <span className='text-dark-600 text-sm leading-5 flex items-center'>0.00203  <Chip variant="outlined" color={"dark-400"}>
                                            ETH
                                        </Chip></span>
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/Fee.svg'}>Fee</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <span className='text-dark-600 text-sm leading-5 flex items-center'>0.00203  <Chip variant="outlined" color={"dark-400"}>
                                            ETH
                                        </Chip></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/building.svg'}>Paymentmaster</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex items-center gap-2 flex-1'>
                                            <span className='text-blue-200 text-sm leading-5'>8596515</span>
                                            <CopyButton text="" />
                                            <button className='outline-none focus:outline-none ring-0 focus:ring-0'>
                                                <img src="/images/share.svg" alt="" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/Beneficiary.svg'}>Beneficiary</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex items-center gap-2 flex-1'>
                                            <span className='text-blue-200 text-sm leading-5'>0x4f175d2c5d6e88bc406c294c505bea41fc17b0b2029b406058a8e17c358e530e</span>
                                            <CopyButton text="" />
                                            <button className='outline-none focus:outline-none ring-0 focus:ring-0'>
                                                <img src="/images/share.svg" alt="" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className='py-[14px] px-4 text-right'>
                                        <span className='text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal'>
                                            Power by <img src="/images/candide.svg" alt="" />
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/Hash.svg'}  >Transaction Hash</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex items-center gap-2 flex-1'>
                                            <span className='text-blue-200 text-sm leading-5'>0x4f175d2c5d6e88bc406c294c505bea41fc17b0b2029b406058a8e17c358e530e</span>
                                            <CopyButton text="" />
                                            <button className='outline-none focus:outline-none ring-0 focus:ring-0'>
                                                <img src="/images/share.svg" alt="" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className='py-[14px] px-4 text-right'>
                                        <span className='text-bluegrey-300 text-[10px] leading-5 flex justify-end items-center gap-2 font-normal'>
                                            Power by <img src="/images/candide.svg" alt="" />
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 min-w-[205px]'>
                                        <IconText icon={'/images/cube.svg'}  >Block</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex items-center gap-2 flex-1'>
                                            <span className='text-blue-200 text-sm leading-5'>8596515</span>
                                            <CopyButton text="" />
                                            <button className='outline-none focus:outline-none ring-0 focus:ring-0'>
                                                <img src="/images/share.svg" alt="" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className='py-[14px] px-4 text-right'>

                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </div>
                </div>
            </section>
            <section className='mt-[48px] px-3 mb-10'>
                <div className='container px-0'>
                    <div>
                        <Caption icon={'/images/cube.svg'} text={""}>Developer Details</Caption>
                    </div>
                    <div className='bg-white overflow-auto rounded shadow-300 '>
                        <table className='min-w-full divide-y divide-gray-600'>

                            <tbody className='min-w-full divide-y divide-gray-300'>
                                <tr>
                                    <td className='py-[14px] px-4 xl:min-w-[205px]'>
                                        <IconText icon={'/images/code-array.svg'}>Value</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex items-center gap-2 flex-1'>
                                            <span className='text-blue-200 text-sm leading-5'>0</span>
                                            <CopyButton text="" />

                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <td className='py-[14px] px-4 lg:min-w-[205px]'>
                                        <IconText icon={'/images/code-array.svg'}>Calldata</IconText>
                                    </td>
                                    <td className='py-[14px] px-4 whitespace-pre'>
                                        <div className='flex my-[16px] mb-2'>
                                            {BUTTON_LIST.map(({ name, key }, index) => (
                                                <Chip
                                                className={`bg-[${selectedColor === key ? "#1976D2" : "#fff"}] text-white table-tab py-[6px] px-3 ${sx.tab}`}
                                                onClick={() => setSelectedColor(key)}
                                                key={index}
                                                color={`${selectedColor === key ? "info" : "white"}`}
                                              >
                                                {name}
                                              </Chip>
                                            ))}
                                            {/* <Chip className={`bg-[#1976D2] table-tab text-white py-[6px] px-3 ${sx.tab}`} color='info' >Default view</Chip>
                                            <Chip className='bg-[#1976D2] text-white py-[6px] px-3' color='info' >UTF-8</Chip>
                                            <Chip className='bg-[#1976D2] text-white py-[6px] px-3' color='info' >Original</Chip> */}

                                        </div>
                                        <div className='flex gap-2'>
                                            <div className='overflow-auto flex-1 max-h-[290px] custom-scroll   bg-white border-dark-200 rounded border'>
                                                <table className='min-w-full divide-y divide-dark-100'>
                                                    <thead className='bg-white'>
                                                        <tr>
                                                            <th scope="col" className="sticky z-10 top-0 bg-white text-end text-[12px] font-bold leading-5 text-dark-600 py-[14px] px-4">
                                                                #
                                                            </th>
                                                            <th scope="col" className="sticky z-10 top-0 bg-white py-2 text-left text-[12px] font-bold leading-5 text-dark-600">
                                                                Name
                                                            </th>
                                                            <th scope="col" className="sticky z-10 top-0 bg-white py-2 text-left text-[12px] font-bold leading-5 text-dark-600">
                                                                Type
                                                            </th>
                                                            <th scope="col" className="sticky z-10 top-0 bg-white py-2 text-left text-[12px] font-bold leading-5 text-dark-600">
                                                                Date
                                                            </th>

                                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                                <span className="sr-only">Edit</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='divide-y divide-dark-100'>
                                                        <tr>
                                                            <td className='text-black[87%] text-end text-sm leading-5  py-[14px] px-4'>
                                                                0
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                ops.sender
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                address
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                <span className='text-blue-200 text-sm leading-5'>0x4f175d2c5d6e88bc406c294c505bea41fc17b0b2029b406058a8e17c358e530e</span>
                                                            </td>
                                                        </tr>
                                                        <tr className='bg-gray-50'>
                                                            <td className='text-black[87%] text-end text-sm leading-5 py-[14px] px-4'>
                                                                0
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5 '>
                                                                ops.nonce
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5 '>
                                                                uint256
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5 '>
                                                                8
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-black[87%] text-end text-sm leading-5 py-[14px] px-4'>
                                                                0
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                ops.initCode
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                bytes
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                0x
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-black[87%] text-end text-sm leading-5 py-[14px] px-4'>
                                                                0
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                ops.calldata
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>

                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                <span className='text-blue-200 text-sm leading-5'></span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-black[87%] text-end text-sm leading-5 py-[14px] px-4'>
                                                                999
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                ops.verificationGasLimit
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                uint256
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                100000
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-black[87%] text-end text-sm leading-5 py-[14px] px-4'>
                                                                999
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                ops.verificationGasLimit
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                uint256
                                                            </td>
                                                            <td className='whitespace-pre text-black[87%] py-[14px] text-sm leading-5'>
                                                                100000
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='w-[20px]'>
                                                <CopyButton text="" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default RecentUserOps;
