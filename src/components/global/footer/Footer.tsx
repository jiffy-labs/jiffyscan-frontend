/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import FeedbackCard from "./FeedbackCard";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("0x9d43282Bd85dED61Ca57e455a5359427a6Dc0cbc");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <><FeedbackCard /><footer className="w-full pt-10 bg-[#1F1F1F] border-t shadow-100  dark:border-[#444444] lg:pr-12 xl:pr-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8 lg:ml-4">
                  <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                      <a
                          href=""
                          className="flex justify-center lg:justify-start "
                      >
                          <img src="/JiffyLogo_dark.svg" alt="" className="w-48" />
                          
                      </a>
                      <p className="py-8 lg:text-lg xl:text-xl font-inter text-gray-500 lg:max-w-lg text-center lg:text-left">
                          Supercharge your blockchain experience with seamless UserOp
                          tracking and advanced debugging tools.
                      </p>
                      <div className="flex lg:flex xl:flex sm:flex md:hidden flex-col mt-4 space-x-4 sm:justify-center lg:mt-12">
                          <p className="py-6 text-[24px] leading-8 text-white">
                              Our Socials
                          </p>
                          <div className="flex space-x-8">
                              <a
                                  href="https://x.com/JiffyScan"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/Twitter_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/Twitter_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>

                              <a
                                  href="https://github.com/jiffy-labs"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/Github_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/Github_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>

                              <a
                                  href="https://bit.ly/JiffyScan-Group"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/Telegram_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/Telegram_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>

                              <a
                                  href="https://www.linkedin.com/company/jiffylabs/"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/LinkedIN_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/LinkedIN_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>

                              <a
                                  href="https://medium.com/jiffylabs"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/Medium_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/Medium_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>
                          </div>
                      </div>
                  </div>

                  <div className="lg:ml-40 md:ml-8 text-left">
                      <h4 className="text-xl lg:text-xl text-[#F0F0F0] font-inter font-medium mb-3">
                          Product
                      </h4>
                      <ul className="text-sm transition-all duration-500 whitespace-nowrap">
                          <li className="mb-2">
                              <a
                                  href="https://jiffyscan.xyz/"
                                  className="text-[#9E9E9E] text-lg xl:text-base lg:text-md hover:text-[#0A84FF]"
                              >
                                  Explorer as a Service
                              </a>
                          </li>
                          <li className="mb-2">
                              <a
                                  href="https://jiffyscan.mintlify.app/Quickstart/bundler"
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Bundler API
                              </a>
                          </li>
                          <li className="mb-2">
                              <a
                                  href="https://jiffyscan.mintlify.app/Quickstart/paymaster"
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Paymaster API
                              </a>
                          </li>
                          <li className="mb-2">
                              <a
                                  href="https://jiffyscan.mintlify.app/Quickstart/dataapis"
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Data API
                              </a>
                          </li>
                          <li>
                              <a
                                  href="javascript:;"
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  GasFee Infrastructure
                              </a>
                          </li>
                      </ul>
                  </div>

                  <div className="lg:ml-48 md:ml-8 text-left">
                      <h4 className="text-xl text-[#F0F0F0] font-inter font-medium mb-3">
                          Company
                      </h4>
                      <ul className="text-sm transition-all duration-500 whitespace-nowrap">
                          <li className="mb-2">
                              <Link
                                  href="/about-us"
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  About Us
                              </Link>
                          </li>
                          <li className="mb-2">
                              <a
                                  href=""
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Contact Us
                              </a>
                          </li>
                          <li className="mb-2">
                              <a
                                  href=""
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Careers
                              </a>
                          </li>
                          <li className="mb-2">
                              <a
                                  href="https://adityaagarwal.notion.site/Brand-Assets-137d4749fb6b4cc3880475abfc5f7ae2"
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Brand Assets
                              </a>
                          </li>
                          <li>
                              <a
                                  href=""
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Privacy
                              </a>
                          </li>
                      </ul>
                  </div>

                  <div className="lg:ml-48 md:ml-8 text-left">
                      <h4 className="text-xl text-[#F0F0F0] font-inter font-medium mb-3">
                          Community
                      </h4>
                      <ul className="text-sm transition-all duration-500 whitespace-nowrap">
                          <li className="mb-2">
                              <a
                                  href="https://jiffyscan.mintlify.app/welcome"
                                  target="_blank"
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  API Documentation
                              </a>
                          </li>
                          <li className="mb-2">
                              <a
                                  href=""
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Knowledge Base
                              </a>
                          </li>
                          <li className="mb-2">
                              <a
                                  href=""
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Submit an Issue
                              </a>
                          </li>
                          <li className="mb-2">
                              <a
                                  href=""
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  Blog
                              </a>
                          </li>
                          <li>
                              <Link
                                  href="/pricing"
                                  className="text-[#9E9E9E] xl:text-base lg:text-md text-lg hover:text-[#0A84FF]"
                              >
                                  FAQ
                              </Link>
                          </li>
                      </ul>
                  </div>

                  <div className="flex mt-72 gap-32 -ml-24 text-white space-y-4">
                      <div className=" flex-col -ml-[450px] mt-4 space-x-4 sm:justify-center md:mt-2 md:flex hidden xl:hidden lg:hidden">
                          <p className="py-6 ml-4 text-[24px] leading-8 text-white">
                              Our Socials
                          </p>
                          <div className="flex space-x-8">
                              <a
                                  href="https://x.com/JiffyScan"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/Twitter_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/Twitter_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>

                              <a
                                  href="https://github.com/jiffy-labs"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/Github_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/Github_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>

                              <a
                                  href="https://bit.ly/JiffyScan-Group"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/Telegram_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/Telegram_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>

                              <a
                                  href="https://www.linkedin.com/company/jiffylabs/"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/LinkedIN_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/LinkedIN_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>

                              <a
                                  href="https://medium.com/jiffylabs"
                                  className="w-8 h-8 flex justify-center items-center relative"
                              >
                                  <img
                                      src="/Medium_Default.svg"
                                      alt="icon"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0" />

                                  <img
                                      src="/Medium_onHover.svg"
                                      alt="icon-hover"
                                      className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100" />
                              </a>
                          </div>
                      </div>

                      <div>
                          <p className="font-medium lg:-mt-5 xl:-mt-8 md:mt-5 text-[24px] leading-8 text-nowrap font-inter">
                              Sounds Interesting?
                          </p>
                          <p className="flex items-center text-xl font-inter gap-4 lg:mt-2 xl:mt-4 md:mt-5 text-nowrap">
                              Donate At:
                              <span className="flex items-center gap-2 hover:text-[#0A84FF]">
                                  0x9d...0cbc
                                  <FaCopy
                                      onClick={handleCopy}
                                      className="cursor-pointer text-gray-500 hover:text-white" />
                              </span>
                              {copied && (
                                  <span className="text-sm text-green-500">Copied!</span>
                              )}
                          </p>
                      </div>
                  </div>
              </div>

              <div className="py-7 border-t lg:w-[105%] xl:w-[100%] mx-auto border-[#5A5A62]">
                  <div className=" flex items-center justify-between lg:justify-between flex-col lg:flex-row">
                      <span className="text-[20px] tracking-wide text-gray-500">
                          ©<a href="https://jiffyscan.xyz">2024</a> JiffyLabs
                      </span>
                  </div>
              </div>
          </div>
      </footer></>
  );
};

export default Footer;