import React from 'react';
import Faq from './Faq';

const PricingSection = () => {
    return (
        <div className="sm:flex sm:flex-col sm:align-center p-10">
            <div className="relative self-center items-center align-center font-poppins font-medium text-xl md:text-[40px] p-0.5 flex">
                <h1>Get access to Premium APIs</h1>
            </div>
            <div className="mt-12 space-y-3 object-fit sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6  md:mx-auto xl:grid-cols-3">
                <div className="border bg-gradient-to-b from-[#E7ECFE] to-[#F9F9FA] border-slate-200 md:w-[324px] h-[355px] rounded-2xl shadow-lg  divide-slate-200">
                    <div className="p-6">
                        <h2 className="text-[32px] font-poppins font-medium leading-auto text-slate-900">Starter</h2>
                        <p className="mt-4 text-ph font-poppins text-[#636F87]">Start for free - no card details needed</p>
                        <p className="mt-8">
                            <span className="text-[32px] font-poppins font-medium text-slate-900">$0</span>
                            <p className="text-ph font-poppins text-[#636F87]">per month</p>
                        </p>
                        <a
                            href="#"
                            className="mt-8 block h-[50px] w-full bg-[#6C47FF] rounded-md py-2 text-xl font-semibold text-white text-center content-center"
                        >
                            <button>
                            Get Free API Key
                            </button>
                        </a>
                    </div>
                    <div className="pt-2 pb-8 px-6">
                        <ul role="list" className="space-y-3">
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">5 calls/second</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">1000 calls/day</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border bg-gradient-to-b from-[#E7ECFE] to-[#F9F9FA] border-slate-200 md:w-[324px] h-[387px] rounded-2xl shadow-lg  divide-slate-200">
                    <div className="p-6">
                        <h2 className="text-[32px] font-poppins font-medium leading-auto">Developer</h2>
                        <p className="mt-4 text-ph font-poppins text-[#636F87]">Affordable plan for small-scale development projects.</p>
                        <p className="mt-4">
                            <span className="text-[32px] font-poppins font-medium leading-auto text-slate-900">$43</span>
                            <p className="text-ph font-poppins font-medium text-[#636F87]">per month, billed yearly</p>
                            <p className="text-ph font-poppins text-[#636F87]">or $54 when billed monthly</p>
                        </p>
                        <a
                            href="#"
                            className="mt-4 block font-poppins h-[50px] w-full bg-[#6C47FF] rounded-md py-2  text-xl font-semibold text-white text-center content-center"
                        >
                            <button>
                            Continue
                            </button>
                        </a>
                    </div>
                    <div className="pt-2 pb-8 px-6">
                        <ul role="list" className=" space-y-3">
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">10 calls/second</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">10000 calls/day</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">Community Support</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border bg-gradient-to-b from-[#C8FDDD] via-[#E5F2ED] to-[#EFEEF2] border-slate-200 md:w-[324px] h-[451px] rounded-2xl shadow-lg  divide-slate-200">
                    <div className="p-6">
                        <h2 className="text-[32px] font-poppins font-medium leading-auto">Professional</h2>
                        <p className="mt-4 text-ph font-poppins text-[#636F87]">
                            Advanced features for growing businesses and applications.
                        </p>
                        <p className="mt-4">
                            <span className="text-[32px] font-poppins font-medium leading-auto text-slate-900">$83</span>

                            <p className="text-ph font-poppins font-medium text-[#636F87]">per month, billed yearly</p>
                            <p className="text-ph font-poppins text-[#636F87]">or $103 when billed monthly</p>
                        </p>
                        <a
                            href="#"
                            className="mt-4 block font-poppins h-[50px] w-full bg-[#6C47FF] rounded-md py-2 text-xl font-semibold text-white text-center content-center"
                        >
                            <button>
                            Continue
                            </button>
                        </a>
                    </div>
                    <div className="pt-2 pb-8 px-6">
                        <ul role="list" className="space-y-3">
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">25 calls/second</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">50000 calls/day</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">Dedicated Support</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">Premium and Custom Endpoints</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                        fill="#6C47FF"
                                    />
                                </svg>

                                <span className="text-ph font-poppins text-[#636F87]">Better Indexing Latency</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relative pt-8 dark:bg-gray-800 md:px-44">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-normal hover:bg-hover transition-all duration-300 relative max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                        <div className="flex-1 dark:bg-gray-900 px-6 py-8 lg:p-12">
                            <h3 className="md:text-3xl md:mb-8 text-2xl text-center font-poppins font-medium text-white dark:text-white sm:text-3xl">
                                Enterprise Plan
                            </h3>
                             <div className="md:flex gap-8 justify-center items-center">
                                <p className="mt-6 flex gap-2 md:text-xl text-sm font-poppins font-medium text-white dark:text-gray-300">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 14C11.875 14 14 11.949 14 7C14 11.949 16.11 14 21 14C16.11 14 14 16.11 14 21C14 16.11 11.875 14 7 14ZM1 5.5C4.134 5.5 5.5 4.182 5.5 1C5.5 4.182 6.857 5.5 10 5.5C6.857 5.5 5.5 6.857 5.5 10C5.5 6.857 4.134 5.5 1 5.5Z"
                                            fill="#FFBF1C"
                                            stroke="#FFBF1C"
                                            stroke-width="0.5"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Custom calls/second
                                </p>
                                <p className="mt-6 flex gap-2 md:text-xl text-sm font-poppins font-medium text-white dark:text-gray-300">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 14C11.875 14 14 11.949 14 7C14 11.949 16.11 14 21 14C16.11 14 14 16.11 14 21C14 16.11 11.875 14 7 14ZM1 5.5C4.134 5.5 5.5 4.182 5.5 1C5.5 4.182 6.857 5.5 10 5.5C6.857 5.5 5.5 6.857 5.5 10C5.5 6.857 4.134 5.5 1 5.5Z"
                                            fill="#FFBF1C"
                                            stroke="#FFBF1C"
                                            stroke-width="0.5"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Custom calls/day
                                </p>
                            </div>
                            <div className="md:flex gap-8 justify-center items-center">
                                <p className="mt-6 font-poppins flex gap-2 font-medium text-ph text-white dark:text-gray-300">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                            fill="white"
                                            fill-opacity="0.8"
                                        />
                                    </svg>
                                    Dedicated Support
                                </p>
                                <p className="mt-6 flex gap-2 font-poppins font-medium text-ph text-white dark:text-gray-300">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                            fill="white"
                                            fill-opacity="0.8"
                                        />
                                    </svg>
                                    Premium Custom Endpoints
                                </p>
                                <p className="mt-6 flex gap-2 font-poppins font-medium text-ph text-white dark:text-gray-300">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 2.00375L6 14.0037L0.5 8.50375L1.91 7.09375L6 11.1737L16.59 0.59375L18 2.00375Z"
                                            fill="white"
                                            fill-opacity="0.8"
                                        />
                                    </svg>
                                    Better Indexing Latency
                                </p>
                            </div>
                            <div className="mt-8 items-center text-center">
                                <a
                                    href="#"
                                    className="text-[#2A454B] no-underline font-poppins font-medium md:w-[209px] md:h-[40px] bg-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    <button>
                                    Contact Sales
                                    </button>
                                    
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Faq/>
            </div>
        </div>
    );
};

export default PricingSection;
