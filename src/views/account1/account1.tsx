import React, { useState, useRef, useEffect } from 'react';
import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import circle from '../../../public/images/circle.png';
import Rcircle from '../../../public/images/r-circle.png';
import copy from '../../../public/images/content-copy.svg';
import eye from '../../../public/images/eye.png';
import plus from '../../../public/images/plus.png';
import bell from '../../../public/images/bell.png';
import shortBell from '../../../public/images/short-bell.png';
import dot from '../../../public/images/dot.png';
import pen from '../../../public/images/pen.png';
import api from '../../../public/images/api.png';
import arrow from '../../../public/images/uparrow.png';
import refresh from '../../../public/images/refresh.png';
import trash from '../../../public/images/delete.png';
import Image from 'next/image';
import ApexLineChart from '../../../src/views/account1/apexchart';

const Account1 = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && (!dropdownRef.current.contains(event.target) as any)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="hello">
                <Navbar searchbar />
                <div className="container py-3 px-[16px] w-full">
                    <p style={{ fontSize: '34px', fontWeight: 'bolder' }}>API Keys</p>
                    <div style={{ display: 'flex' }} className="grid gap-2 mt-6 font-bold text-center alignItem-center">
                        <div
                            className="rounded border flex align-items-center justify-center gap-2 bg-black text-white text-center"
                            style={{ fontSize: '14px', padding: '10px 30px' }}
                        >
                            <Image src={plus} alt="" className="h-3 w-3" style={{ marginTop: '4px' }} />
                            <p>CREATE NEW KEY</p>
                        </div>
                        <div
                            className="rounded border flex align-items-center justify-center text-center gap-2"
                            style={{ fontSize: '14px', padding: '10px 30px' }}
                        >
                            <Image src={api} alt="" className="h-5 w-6" style={{ marginTop: '2px' }} />
                            <p> CHECK API PLANS</p>
                        </div>
                    </div>
                    <div
                        className="responsiveContainer py-5 px-6 border rounded mt-6 w-full"
                        style={{ boxShadow: 'rgba(178, 180, 201, 0.408) 0px 2px 0px 0px' }}
                    >
                        <div className="responsiveGrid gap-8 lg:flex-row lg:flex md:flex-col">
                            <div className="leftContent lg:w-1/2 lg:pr-4">
                                <p style={{ color: '#455A64', fontSize: '14px' }}>key</p>
                                <div className="d-flex alignItm-center flex gap-3 mt-1">
                                    <Image src={circle} alt="" className="h-5 w-5 mt-1" />
                                    <p style={{ color: '#263238' }} className="sm:text-[14px] text-[10px]">
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
                                    <div className="" style={{ fontSize: '16px', color: '#263238' }}>
                                        30, 112 / Unlimited
                                    </div>
                                    <div className="" style={{ fontSize: '16px', color: '#263238' }}>
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
                                    <div className="font-bold flex align-items-center gap-2" style={{ fontSize: '16px', color: '#263238' }}>
                                        <Image src={bell} alt="" className="h-4 w-4 mt-1" /> 5 / 5
                                    </div>
                                </div>
                                <div className="flex mt-10 font-bold text-center gap-3">
                                    <div
                                        className="rounded border flex align-items-center justify-center text-center gap-2 px-[10px] pt-2 sm:px-[16px] sm:py-[8px] text-[14px]"
                                        style={{ color: '#263238' }}
                                    >
                                        <Image src={pen} alt="" className="h-2 w-2 sm:h-4 sm:w-4 mt-1" />
                                        <p className="sm:text-[14px] text-[10px]">MANAGE PLAN</p>
                                    </div>
                                    <div
                                        className="rounded border flex align-items-center text-center gap-2 px-[20px] pt-1 sm:px-[15px] sm:py-[8px]"
                                        style={{ color: '#263238' }}
                                    >
                                        <Image src={shortBell} alt="" className="h-2 w-2 sm:h-4 sm:w-4 mt-1" />{' '}
                                        <p className="sm:text-[14px] text-[10px]"> EDIT NOTIFICATION</p>
                                    </div>
                                    <button
                                        className="rounded border flex align-items-center justify-center text-center gap-2  px-[10px] pt-4 sm:px-[30px] sm:py-[8px]"
                                        style={{ color: '#263238' }}
                                        // onClick={toggleDropdown}
                                    >
                                        <p className="sm:text-[14px] text-[10px]">MORE</p>{' '}
                                        <Image src={dot} alt="" className="h-2 w-2 sm:h-4 sm:w-4 mt-2 sm:mt-1" />
                                    </button>
                                    {/* {isDropdownOpen && (
                                        <div ref={dropdownRef} className="bg-black absolute w-40 ml-80 text-white px-4 py-4 rounded">
                                            <p style={{ color: '#607D8B', fontSize: '14px' }}>ACCOUNT</p>
                                            <p style={{ color: '#263238', fontSize: '16px', fontWeight: 'bold' }}> My Profile</p>
                                            <p style={{ color: '#263238', fontSize: '16px', fontWeight: 'bold' }}>API Plans</p>
                                        </div>
                                    )} */}
                                </div>
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
                </div>
            </div>

            <div className="hello">
                <div className="container py-3 px-[16px] w-full ">
                    <div
                        className="responsiveContainer py-5 px-6 border rounded w-full "
                        style={{ boxShadow: 'rgba(178, 180, 201, 0.408) 0px 2px 0px 0px' }}
                    >
                        <div className="responsiveGrid gap-8 lg:flex-row lg:flex md:flex-col">
                            <div className="leftContent lg:w-1/2 lg:pr-4">
                                <p style={{ color: '#455A64', fontSize: '14px' }}>key</p>
                                <div className="d-flex alignItm-center flex gap-3 mt-1">
                                    <Image src={Rcircle} alt="" className="h-5 w-5 mt-1" />
                                    <p style={{ color: '#263238' }} className="sm:text-[14px] text-[10px]">
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
                                    <div className="" style={{ fontSize: '16px', color: '#263238' }}>
                                        30, 112 / Unlimited
                                    </div>
                                    <div className="" style={{ fontSize: '16px', color: '#263238' }}>
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
                                    <div className="font-bold flex align-items-center gap-2" style={{ fontSize: '16px', color: '#263238' }}>
                                        <Image src={bell} alt="" className="h-4 w-4 mt-1" /> 5 / 5
                                    </div>
                                </div>
                                <div className="flex mt-10 font-bold text-center gap-3">
                                    <div
                                        className="rounded border flex align-items-center justify-center text-center gap-2 px-[10px] pt-2 sm:px-[16px] sm:py-[8px] text-[14px]"
                                        style={{ color: '#263238' }}
                                    >
                                        <Image src={pen} alt="" className="h-2 w-2 sm:h-4 sm:w-4 mt-1" />
                                        <p className="sm:text-[14px] text-[10px]">MANAGE PLAN</p>
                                    </div>
                                    <div
                                        className="rounded border flex align-items-center text-center gap-2 px-[20px] pt-1 sm:px-[15px] sm:py-[8px]"
                                        style={{ color: '#263238' }}
                                    >
                                        <Image src={shortBell} alt="" className="h-2 w-2 sm:h-4 sm:w-4 mt-1" />{' '}
                                        <p className="sm:text-[14px] text-[10px]"> EDIT NOTIFICATION</p>
                                    </div>
                                    <button
                                        className="rounded border flex align-items-center justify-center text-center gap-2  px-[10px] pt-4 sm:px-[30px] sm:py-[8px]"
                                        style={{ color: '#263238' }}
                                        // onClick={toggleDropdown}
                                    >
                                        <p className="sm:text-[14px] text-[10px]">MORE</p>{' '}
                                        <Image src={dot} alt="" className="h-2 w-2 sm:h-4 sm:w-4 mt-2 sm:mt-1" />
                                    </button>
                                    {/* {isDropdownOpen && (
                                        <div ref={dropdownRef} className="bg-black absolute w-40 ml-80 text-white px-4 py-4 rounded">
                                            <p style={{ color: '#607D8B', fontSize: '14px' }}>ACCOUNT</p>
                                            <p style={{ color: '#263238', fontSize: '16px', fontWeight: 'bold' }}> My Profile</p>
                                            <p style={{ color: '#263238', fontSize: '16px', fontWeight: 'bold' }}>API Plans</p>
                                        </div>
                                    )} */}
                                </div>
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
                </div>
            </div>

            <div className="hello">
                <div className="container py-3 px-[16px] w-full">
                    <div
                        className="responsiveContainer py-5 px-6 border rounded w-full"
                        style={{ boxShadow: 'rgba(178, 180, 201, 0.408) 0px 2px 0px 0px' }}
                    >
                        <div className="responsiveGrid gap-8 lg:flex-row lg:flex md:flex-col">
                            <div className="leftContent lg:w-1/2 lg:pr-4">
                                <p style={{ color: '#455A64', fontSize: '14px' }}>key</p>
                                <div className="d-flex alignItm-center flex gap-3 mt-1">
                                    <Image src={circle} alt="" className="h-5 w-5 mt-1" />
                                    <p style={{ color: '#263238' }} className="sm:text-[14px] text-[10px]">
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
                                    <div className="" style={{ fontSize: '16px', color: '#263238' }}>
                                        30, 112 / Unlimited
                                    </div>
                                    <div className="" style={{ fontSize: '16px', color: '#263238' }}>
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
                                    <div className="font-bold flex align-items-center gap-2" style={{ fontSize: '16px', color: '#263238' }}>
                                        <Image src={bell} alt="" className="h-4 w-4 mt-1" /> 5 / 5
                                    </div>
                                </div>
                                <div className="flex mt-10 font-bold text-center gap-3">
                                    <div
                                        className="rounded border flex align-items-center justify-center text-center gap-2 px-[10px] pt-2 sm:px-[16px] sm:py-[8px] text-[14px]"
                                        style={{ color: '#263238' }}
                                    >
                                        <Image src={pen} alt="" className="h-2 w-2 sm:h-4 sm:w-4 mt-1" />
                                        <p className="sm:text-[14px] text-[10px]">MANAGE PLAN</p>
                                    </div>
                                    <div
                                        className="rounded border flex align-items-center text-center gap-2 px-[20px] pt-1 sm:px-[15px] sm:py-[8px]"
                                        style={{ color: '#263238' }}
                                    >
                                        <Image src={shortBell} alt="" className="h-2 w-2 sm:h-4 sm:w-4 mt-1" />{' '}
                                        <p className="sm:text-[14px] text-[10px]"> EDIT NOTIFICATION</p>
                                    </div>
                                    <div className="relative">
                                        <button
                                            className="rounded border flex items-center justify-center text-center gap-2 px-[10px] pt-4 sm:px-[30px] sm:py-[8px]"
                                            style={{ color: '#263238' }}
                                            // onClick={toggleDropdown}
                                            onClick={toggleDropdown}
                                        >
                                            <p className="sm:text-[14px] text-[10px]">MORE</p>
                                            <Image src={arrow} alt="" className="h-2 w-2 sm:h-3 sm:w-3 mt-2 sm:mt-1" />
                                        </button>
                                        {isDropdownOpen && (
                                            <div
                                                // ref={dropdownRef}
                                                // onClick={()=>setDropdownOpen(!isDropdownOpen)}
                                                className="bg-white absolute w-35 text-white mt-1 ml-[-5px] sm:ml-0 text-white px-5 py-5 rounded"
                                            >
                                                <div className="flex items-center gap-2 py-2">
                                                    <Image src={refresh} alt="" className="h-4 w-4 mt-1" />
                                                    <p style={{ color: '#263238', fontSize: '16px' }}>RESET</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Image src={trash} alt="" className="h-4 w-5 mt-1" />
                                                    <p style={{ color: '#263238', fontSize: '16px' }}>DELETE</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
                </div>
            </div>

            <div className="mt-20">
                <Footer />
            </div>

            <style>
                {`
                    @media (max-width:991px) {
                   .container{
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                    max-width: 100%
                   }
                   
                }
                `}
            </style>
        </>
    );
};

export default Account1;
