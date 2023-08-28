import React, { useState } from 'react';
import ApexLineChart from './apexchart';
import circle from '../../../public/images/circle.png';
import copy from '../../../public/images/content-copy.svg';
import eye from '../../../public/images/eye.png';
import bell from '../../../public/images/bell.png';
import shortBell from '../../../public/images/short-bell.png';
import dot from '../../../public/images/dot.png';
import pen from '../../../public/images/pen.png';
import Image from 'next/image';
import refresh from '../../../public/images/refresh.png';
import trash from '../../../public/images/delete.png';

const Firstkey = () => {
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

    return (
        <div
            className="responsiveContainer py-5 px-6 border rounded mt-6 w-full"
            style={{ boxShadow: 'rgba(178, 180, 201, 0.408) 0px 2px 0px 0px' }}
        >
            <div className="responsiveGrid gap-8 lg:flex-row lg:flex md:flex-col">
                <div className="leftContent lg:w-1/2 lg:pr-4">
                    <p style={{ color: '#455A64', fontSize: '14px', fontWeight: '400' }}>Key</p>
                    <div className="d-flex alignItm-center flex gap-3 mt-1">
                        <Image src={circle} alt="" className="h-5 w-5 mt-1" />
                        <p style={{ color: '#263238' }} className="sm:text-[14px] text-[10px] font-semibold">
                            server_8***********************52e06621087
                        </p>
                        <Image src={eye} alt="" className="h-4 w-4 mt-1" />
                        <Image src={copy} alt="" />
                    </div>
                    <div className="grid grid-cols-2 gap-15 mt-7">
                        <div className="" style={{ fontSize: '14px', color: '#455A64' }}>
                            Requests per last 24 hours
                        </div>
                        <div className="" style={{ fontSize: '14px', color: '#455A64' }}>
                            Requests per second
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-15">
                        <div className="font-[400]" style={{ fontSize: '16px', color: '#263238' }}>
                            30, 112 / Unlimited
                        </div>
                        <div className="font-[400]" style={{ fontSize: '16px', color: '#263238' }}>
                            15 rps
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-15 mt-7">
                        <div className="" style={{ fontSize: '14px' }}>
                            Plan
                        </div>
                        <p style={{ fontSize: '14px' }}> Notifications</p>
                    </div>
                    <div className="grid grid-cols-2 gap-15">
                        <div className="font-bold" style={{ fontSize: '16px', color: '#4CAF50' }}>
                            Premium
                        </div>
                        <div className=" flex align-items-center gap-2" style={{ fontSize: '16px', color: '#263238' }}>
                            <Image src={bell} alt="" className="h-4 w-4 mt-1" /> 5 / 5
                        </div>
                    </div>
                    <div className="flex mt-10 font-bold text-center gap-3">
                        <div
                            className="rounded border flex items-center justify-center text-center gap-2 px-[10px] pt-2 sm:px-[16px] sm:py-[8px] text-[14px]"
                            style={{ color: '#263238' }}
                        >
                            <Image src={pen} alt="" className="h-2 w-2 sm:h-4 sm:w-4 " />
                            <p className="sm:text-[14px] text-[10px]">MANAGE PLAN</p>
                        </div>
                        <div
                            className="rounded border flex items-center text-center gap-2 px-[20px] pt-1 sm:px-[15px] sm:py-[8px]"
                            style={{ color: '#263238' }}
                        >
                            <Image src={shortBell} alt="" className="h-2 w-2 sm:h-4 sm:w-4 " />{' '}
                            <p className="sm:text-[14px] text-[10px]"> EDIT NOTIFICATION</p>
                        </div>
                        <div
                            className="rounded border flex items-center justify-center text-center gap-2  px-[10px] pt-4 sm:px-[30px] sm:py-[8px]"
                            style={{ color: '#263238' }}
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                        >
                            <p className="sm:text-[14px] text-[10px]">MORE</p>{' '}
                            <Image src={dot} alt="" className="h-2 w-2 sm:h-4 sm:w-4  " />
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <div className="mt-3  flex justify-end mr-20">
                            <div className="grid">
                                <div className="flex justify-center items-center gap-2  bg-white w-fit px-6 py-3 ">
                                    <Image src={refresh} alt="" width={20} height={20} />
                                    <h1>Reset</h1>
                                </div>
                                <div className="flex justify-center items-center gap-2 bg-white  px-5 pb-2">
                                    <Image src={trash} alt="" width={20} height={20} />
                                    <h1>Delete</h1>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="rightContent lg:w-1/2 mt-3 lg:mt-0">
                    <div className="font-bold text-center flex items-end justify-end gap-1 sm:gap-2">
                        <div
                            className="rounded border flex align-items-center justify-center text-center text-[10px] sm:text-[14px]"
                            style={{ color: '#263238', padding: '5px 18px' }}
                        >
                            24H
                        </div>
                        <div
                            className="rounded border flex align-items-center justify-center text-center text-[10px] sm:text-[14px]"
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#455A64',
                                padding: '5px 18px',
                            }}
                        >
                            WEEK
                        </div>
                        <div
                            className="rounded border flex align-items-center justify-center text-center text-[10px] sm:text-[14px]"
                            style={{ color: '#263238', padding: '5px 18px' }}
                        >
                            MONTH
                        </div>
                        <div
                            className="rounded border flex align-items-center justify-center text-center text-[10px] sm:text-[14px]"
                            style={{ color: '#263238', padding: '5px 18px' }}
                        >
                            YEAR
                        </div>
                    </div>
                    <ApexLineChart />
                </div>
            </div>
        </div>
    );
};

export default Firstkey;
