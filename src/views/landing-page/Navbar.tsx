/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-[#F8F8F8] opacity-100 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg width="52" height="35" viewBox="0 0 52 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M35.6306 0.699219L20.0747 9.35493V26.3235L35.6306 34.9793L51.1865 26.3235V9.35493M35.6306 5.6484L44.0752 10.3405L35.6306 15.0326L27.2082 10.3405M0.0742188 7.12673V11.4117H15.6301V7.12673M24.5192 13.7899L33.4083 18.7391V28.7874L24.5192 23.8597M46.742 13.7899V23.8597L37.8529 28.7874V18.7391M4.51877 15.6967V19.9817H15.6301V15.6967M8.96331 24.2667V28.5517H15.6301V24.2667"
                            fill="#FF9800"
                        />
                    </svg>
                    <span className="self-center text-2xl md:text-[24px] font-semibold whitespace-nowrap dark:text-white">jiffyscan</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-8 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="
                        md:block
                        hidden
                            text-white 
                            bg-[#6C47FF] 
                            hover:bg-blue-800 
                            focus:ring-4 
                            focus:outline-none 
                            focus:ring-blue-300 
                            font-medium 
                            font-inter
                            rounded-full 
                            text-sm
                            md:text-[16px]
                            px-4 
                            py-2 
                            text-center 
                            lg:w-[170px] 
                            lg:h-[40px] 
                            md:w-auto
                            w-full
                            sm:w-auto 
                            dark:bg-blue-600 
                            dark:hover:bg-blue-700 
                            dark:focus:ring-blue-800
                            "
                    >
                        <Link href='https://dashboard.jiffyscan.xyz/'>
                        View API Key
                        </Link>
                    </button>
                    <button
                        type="button"
                        className="
                        md:block
                        hidden
                            text-[#6C47FF] 
                            bg-[#d1c7f8] 
                            hover:bg-blue-800 
                            focus:ring-4 
                            focus:outline-none 
                            focus:ring-blue-300 
                            font-medium 
                            font-inter
                            rounded-full 
                            text-sm
                            md:text-[16px]
                            px-4 
                            py-2 
                            text-center 
                            lg:w-[112px] 
                            lg:h-[40px] 
                            md:w-auto
                            w-full
                            sm:w-auto 
                            dark:bg-blue-600 
                            dark:hover:bg-blue-700 
                            dark:focus:ring-blue-800
                            "
                    >
                        <Link href='https://dashboard.jiffyscan.xyz/'>
                        Explorer
                        </Link>
                    </button>

                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isOpen}
                        onClick={handleToggle}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-16 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[F8F8F8] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className="relative">
                            <button
                                className="flex items-center py-2 px-3 text-[#5A5A62] rounded md:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page"
                                onClick={handleDropdownToggle}
                            >
                                Products
                                <svg
                                    className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                                        isDropdownOpen ? 'transform rotate-180' : ''
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute left-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Product 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Product 2
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            Product 3
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a
                                href="https://jiffyscan.mintlify.app/welcome"
                                className="flex py-2 px-3 text-[#5A5A62] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Docs
                                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.5 7.5C6.9375 7.5 8 6.4745 8 4C8 6.4745 9.055 7.5 11.5 7.5C9.055 7.5 8 8.555 8 11C8 8.555 6.9375 7.5 4.5 7.5ZM1.5 3.25C3.067 3.25 3.75 2.591 3.75 1C3.75 2.591 4.4285 3.25 6 3.25C4.4285 3.25 3.75 3.9285 3.75 5.5C3.75 3.9285 3.067 3.25 1.5 3.25Z"
                                        fill="#6366F1"
                                        stroke="#6366F1"
                                        stroke-width="0.5"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-[#5A5A62] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Stories
                            </a>
                        </li>
                        <li>
                            <Link
                                href="/pricing"
                                className="block py-2 px-3 text-[#5A5A62] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Pricing
                            </Link>
                        </li>
                        <button
                        type="button"
                        className="
                        md:hidden
                        block
                            text-white 
                            bg-[#6C47FF] 
                            hover:bg-blue-800 
                            focus:ring-4 
                            focus:outline-none 
                            focus:ring-blue-300 
                            font-medium 
                            rounded-full 
                            text-sm
                            md:text-[16px]
                            px-4 
                            py-2 
                            mt-2
                            text-center 
                            w-[170px] 
                            h-[40px] 
                            md:w-auto
                            
                            
                            dark:bg-blue-600 
                            dark:hover:bg-blue-700 
                            dark:focus:ring-blue-800
                            "
                    >
                        <Link href='https://dashboard.jiffyscan.xyz/'>
                        View API Key
                        </Link>
                    </button>
                    <button
                        type="button"
                        className="
                        md:hidden
                        block
                            text-[#6C47FF] 
                            bg-[#d1c7f8] 
                            hover:bg-blue-800 
                            focus:ring-4 
                            focus:outline-none 
                            focus:ring-blue-300 
                            font-medium 
                            font-inter
                            rounded-full 
                            text-sm
                            md:text-[16px]
                            px-4 
                            py-2 
                            text-center 
                            mt-2
                            w-[112px] 
                            h-[40px] 
                            md:w-auto
                            dark:bg-blue-600 
                            dark:hover:bg-blue-700 
                            dark:focus:ring-blue-800
                            "
                    >
                        <Link href='https://www.jiffyscan.xyz/'>
                        Explorer
                        </Link>
                    </button>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
