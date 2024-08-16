/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const Footer = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('0x9d43282Bd85dED61Ca57e455a5359427a6Dc0cbc');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="w-full pt-10 bg-[#1F1F1F]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8 lg:ml-4">
                    <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                        <a href="jiffyscan.xyz" className="flex justify-center lg:justify-start">
                            <img src="/jiffy-white.png" alt="" />
                        </a>
                        <p className="py-8 text-xl font-inter text-gray-500 lg:max-w-sm text-center lg:text-left">
                            Supercharge your blockchain experience with seamless UserOp tracking and advanced debugging tools.
                        </p>
                        <div className="flex flex-col mt-4 space-x-4 sm:justify-center lg:mt-12">
                            <p className="py-6 text-xl text-white">Our Socials</p>
                            <div className="flex space-x-8 ">
                                <a href="https://x.com/JiffyScan" className="w-8 h-8  flex justify-center items-center">
                                    <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.2606 29.6654L13.8614 19.1188L4.59848 29.6654H0.679688L12.1228 16.6402L0.679688 0.332031H10.7409L17.7146 10.2721L26.4523 0.332031H30.3711L19.4591 12.754L31.3219 29.6654H21.2606ZM25.6246 26.6921H22.9863L6.29082 3.30536H8.92947L15.6162 12.6696L16.7725 14.2945L25.6246 26.6921Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                                <a href="https://github.com/jiffy-labs" className="w-8 h-8 flex justify-center items-center ">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16 0.394531C7.16 0.394531 0 7.55853 0 16.3945C0 23.4652 4.584 29.4612 10.94 31.5745C11.74 31.7252 12.0333 31.2305 12.0333 30.8052C12.0333 30.4252 12.02 29.4185 12.0133 28.0852C7.56267 29.0505 6.624 25.9385 6.624 25.9385C5.896 24.0919 4.844 23.5985 4.844 23.5985C3.39467 22.6065 4.956 22.6265 4.956 22.6265C6.56267 22.7385 7.40667 24.2745 7.40667 24.2745C8.83333 26.7212 11.152 26.0145 12.0667 25.6052C12.2107 24.5705 12.6227 23.8652 13.08 23.4652C9.52667 23.0652 5.792 21.6892 5.792 15.5585C5.792 13.8119 6.412 12.3852 7.43867 11.2652C7.25867 10.8612 6.71867 9.23453 7.57867 7.03053C7.57867 7.03053 8.91867 6.6012 11.9787 8.67053C13.2587 8.31453 14.6187 8.13853 15.9787 8.13053C17.3387 8.13853 18.6987 8.31453 19.9787 8.67053C23.0187 6.6012 24.3587 7.03053 24.3587 7.03053C25.2187 9.23453 24.6787 10.8612 24.5187 11.2652C25.5387 12.3852 26.1587 13.8119 26.1587 15.5585C26.1587 21.7052 22.4187 23.0585 18.8587 23.4519C19.4187 23.9319 19.9387 24.9132 19.9387 26.4119C19.9387 28.5532 19.9187 30.2732 19.9187 30.7932C19.9187 31.2132 20.1987 31.7132 21.0187 31.5532C27.42 29.4545 32 23.4545 32 16.3945C32 7.55853 24.836 0.394531 16 0.394531Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                                <a href="https://bit.ly/JiffyScan-Group" className="w-8 h-8 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <linearGradient
                                            id="BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1"
                                            x1="9.858"
                                            x2="38.142"
                                            y1="9.858"
                                            y2="38.142"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stop-color="#33bef0"></stop>
                                            <stop offset="1" stop-color="#0a85d9"></stop>
                                        </linearGradient>
                                        <path
                                            fill="url(#BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1)"
                                            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                                        ></path>
                                        <path
                                            d="M10.119,23.466c8.155-3.695,17.733-7.704,19.208-8.284c3.252-1.279,4.67,0.028,4.448,2.113	c-0.273,2.555-1.567,9.99-2.363,15.317c-0.466,3.117-2.154,4.072-4.059,2.863c-1.445-0.917-6.413-4.17-7.72-5.282	c-0.891-0.758-1.512-1.608-0.88-2.474c0.185-0.253,0.658-0.763,0.921-1.017c1.319-1.278,1.141-1.553-0.454-0.412	c-0.19,0.136-1.292,0.935-1.745,1.237c-1.11,0.74-2.131,0.78-3.862,0.192c-1.416-0.481-2.776-0.852-3.634-1.223	C8.794,25.983,8.34,24.272,10.119,23.466z"
                                            opacity=".05"
                                        ></path>
                                        <path
                                            d="M10.836,23.591c7.572-3.385,16.884-7.264,18.246-7.813c3.264-1.318,4.465-0.536,4.114,2.011	c-0.326,2.358-1.483,9.654-2.294,14.545c-0.478,2.879-1.874,3.513-3.692,2.337c-1.139-0.734-5.723-3.754-6.835-4.633	c-0.86-0.679-1.751-1.463-0.71-2.598c0.348-0.379,2.27-2.234,3.707-3.614c0.833-0.801,0.536-1.196-0.469-0.508	c-1.843,1.263-4.858,3.262-5.396,3.625c-1.025,0.69-1.988,0.856-3.664,0.329c-1.321-0.416-2.597-0.819-3.262-1.078	C9.095,25.618,9.075,24.378,10.836,23.591z"
                                            opacity=".07"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M11.553,23.717c6.99-3.075,16.035-6.824,17.284-7.343c3.275-1.358,4.28-1.098,3.779,1.91	c-0.36,2.162-1.398,9.319-2.226,13.774c-0.491,2.642-1.593,2.955-3.325,1.812c-0.833-0.55-5.038-3.331-5.951-3.984	c-0.833-0.595-1.982-1.311-0.541-2.721c0.513-0.502,3.874-3.712,6.493-6.21c0.343-0.328-0.088-0.867-0.484-0.604	c-3.53,2.341-8.424,5.59-9.047,6.013c-0.941,0.639-1.845,0.932-3.467,0.466c-1.226-0.352-2.423-0.772-2.889-0.932	C9.384,25.282,9.81,24.484,11.553,23.717z"
                                        ></path>
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/company/jiffylabs/" className="w-8 h-8 flex justify-center items-center">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M29.6313 0H2.3625C1.05625 0 0 1.03125 0 2.30625V29.6875C0 30.9625 1.05625 32 2.3625 32H29.6313C30.9375 32 32 30.9625 32 29.6938V2.30625C32 1.03125 30.9375 0 29.6313 0ZM9.49375 27.2687H4.74375V11.9937H9.49375V27.2687ZM7.11875 9.9125C5.59375 9.9125 4.3625 8.68125 4.3625 7.1625C4.3625 5.64375 5.59375 4.4125 7.11875 4.4125C8.6375 4.4125 9.86875 5.64375 9.86875 7.1625C9.86875 8.675 8.6375 9.9125 7.11875 9.9125ZM27.2687 27.2687H22.525V19.8438C22.525 18.075 22.4937 15.7937 20.0562 15.7937C17.5875 15.7937 17.2125 17.725 17.2125 19.7188V27.2687H12.475V11.9937H17.025V14.0813H17.0875C17.7187 12.8813 19.2688 11.6125 21.575 11.6125C26.3813 11.6125 27.2687 14.775 27.2687 18.8875V27.2687V27.2687Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                                <a href="https://medium.com/jiffylabs" className="w-8 h-8 flex justify-center items-center">
                                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18.0534 9.99958C18.0605 12.4019 17.1138 14.7089 15.4214 16.4138C13.7289 18.1188 11.429 19.0823 9.02671 19.0929C6.62439 19.0823 4.32447 18.1188 2.63202 16.4138C0.939571 14.7089 -0.00704951 12.4019 3.9531e-05 9.99958C-0.00704951 7.59725 0.939571 5.29031 2.63202 3.58536C4.32447 1.88041 6.62439 0.916838 9.02671 0.90625C11.429 0.916838 13.7289 1.88041 15.4214 3.58536C17.1138 5.29031 18.0605 7.59725 18.0534 9.99958ZM27.9467 9.99958C27.9467 14.7196 25.9334 18.5596 23.44 18.5596C20.9467 18.5596 18.92 14.7196 18.92 9.99958C18.92 5.27958 20.9467 1.43958 23.44 1.43958C25.9334 1.43958 27.9467 5.27958 27.9467 9.99958ZM32 9.99958C32 14.2263 31.2934 17.6663 30.4134 17.6663C29.5334 17.6663 28.8267 14.2263 28.8267 9.99958C28.8267 5.77292 29.5334 2.33292 30.4134 2.33292C31.2934 2.33292 32 5.77292 32 9.99958Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:mx-48 text-left">
                        <h4 className="text-xl text-[#F0F0F0] font-inter font-medium mb-3">Product</h4>
                        <ul className="text-sm transition-all duration-500 whitespace-nowrap">
                            <li className="mb-2">
                                <a href="https://jiffyscan.xyz/" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Explorer as a Service
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="https://jiffyscan.mintlify.app/Quickstart/bundler" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Bundler API
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="https://jiffyscan.mintlify.app/Quickstart/paymaster" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Paymaster API
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="https://jiffyscan.mintlify.app/Quickstart/dataapis" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Data API
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;" className="text-[#9E9E9E] text-lg hover:text-white">
                                    GasFee Infrastructure
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:mx-48 text-left">
                        <h4 className="text-xl text-[#F0F0F0] font-inter font-medium mb-3">Company</h4>
                        <ul className="text-sm transition-all duration-500 whitespace-nowrap">
                            <li className="mb-2">
                                <Link href="/about-us" className="text-[#9E9E9E] text-lg hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li className="mb-2">
                                <a href="javascript:;" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Contact Us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="javascript:;" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Careers
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="javascript:;" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Brand Assets
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:mx-48 text-left">
                        <h4 className="text-xl text-[#F0F0F0] font-inter font-medium mb-3">Community</h4>
                        <ul className="text-sm transition-all duration-500 whitespace-nowrap">
                            <li className="mb-2">
                                <a href="https://jiffyscan.mintlify.app/welcome" target='_blank' className="text-[#9E9E9E] text-lg hover:text-white">
                                    API Documentation
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="javascript:;" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Knowledge Base
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="javascript:;" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Submit an Issue
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="javascript:;" className="text-[#9E9E9E] text-lg hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-[#9E9E9E] text-lg hover:text-white">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-72 -ml-24 text-white space-y-4">
                        <p className="font-medium text-xl">Sounds Interesting?</p>
                        <p className="flex items-center gap-4">
                            Donate At:
                            <span className="flex items-center gap-2">
                                0x9d...0cbc
                                <FaCopy onClick={handleCopy} className="cursor-pointer text-gray-500 hover:text-white" />
                            </span>
                            {copied && <span className="text-sm text-green-500">Copied!</span>}
                        </p>
                    </div>
                </div>

                <div className="py-7 border-t border-white">
                    <div className="flex items-center justify-between lg:justify-between flex-col lg:flex-row">
                        <span className="text-[20px] tracking-wide text-gray-500">
                            ©<a href="https://jiffyscan.xyz">2024</a> JiffyLabs
                        </span>
                        <p className="text-sm text-gray-500 lg:mr-4">Additional text or information here.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
