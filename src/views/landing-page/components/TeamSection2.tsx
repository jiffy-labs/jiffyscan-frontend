/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { RiTeamFill } from 'react-icons/ri'

const TeamSection2 = () => {
  return (
    <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* About Us */}
                <div className="mb-12 space-y-10">
                    <div className="flex items-center justify-center space-x-2">
                        <RiTeamFill className="text-[#340CD2] text-4xl scale-x-[-1] " />
                        <span className="text-xl text-[#340CD2] font-poppins font-medium">ABOUT US</span>
                    </div>{' '}
                    
                    <p className="text-lg md:text-[48px] text-[34px] font-medium font-poppins text-gray-900 text-center tracking-tightest">To <span className='italic font-semibold text-black font-playfair'>simplifying</span> Web3</p>
                    <div className=''>    
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>We aim to improve the user experience when interacting in web3 space. The first product is <span className='text-[#340CD2]'>JiffyScan.</span></p>
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>a block explorer for UserOperations using EIP-4337. It treats new entities such as User Operations, </p>
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>Paymasters, Bundlers, and Factories as first-class citizens while designing the explorer.</p>
                        <br />
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>In due course, we will release complementary infrastructure services.</p>
                    </div>
                </div>
                {/* TEAM */}
                <div className="mt-28 flex flex-wrap justify-center gap-y-14 max-w-3xl mx-auto lg:max-w-full ">
                    <div className="group block text-center lg:w-1/4 sm:w-1/3 min-[450px]:w-1/2 w-full">
                        <div className="relative mb-5">
                            <img
                                src="/aditya.jpeg"
                                alt="aditya image"
                                className="w-64 h-64 rounded-2xl object-cover mx-auto ransition-all duration-500 rounded-tl-[100px] border-2 border-solid border-transparent group-hover:border-indigo-600"
                            />
                        </div>
                        <h4 className="text-[24px] text-gray-900 font-medium font-poppins text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
                            Aditya
                        </h4>
                        <span className="text-gray-500 font-mono text-[16px] text-center block transition-all duration-500 group-hover:text-gray-900">
                            CHIEF TIME ZONE JUMPER
                        </span>
                        <ul className="flex justify-center mt-4 space-x-4">
                            <li>
                                <a href="https://www.linkedin.com/in/artsofbaniya/" className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                        {' '}
                                        <path
                                            fill="#0288D1"
                                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                        ></path>{' '}
                                    </svg>{' '}
                                </a>
                            </li>
                            <li>
                                <a href="https://artsofbaniya.com/" className="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22.976 19.2C23.104 18.144 23.2 17.088 23.2 16C23.2 14.912 23.104 13.856 22.976 12.8H28.384C28.64 13.824 28.8 14.896 28.8 16C28.8 17.104 28.64 18.176 28.384 19.2M20.144 28.096C21.104 26.32 21.84 24.4 22.352 22.4H27.072C25.5219 25.0692 23.0626 27.0912 20.144 28.096ZM19.744 19.2H12.256C12.096 18.144 12 17.088 12 16C12 14.912 12.096 13.84 12.256 12.8H19.744C19.888 13.84 20 14.912 20 16C20 17.088 19.888 18.144 19.744 19.2ZM16 28.736C14.672 26.816 13.6 24.688 12.944 22.4H19.056C18.4 24.688 17.328 26.816 16 28.736ZM9.6 9.6H4.928C6.46183 6.92325 8.91945 4.89799 11.84 3.904C10.88 5.68 10.16 7.6 9.6 9.6ZM4.928 22.4H9.6C10.16 24.4 10.88 26.32 11.84 28.096C8.92523 27.0917 6.47086 25.0691 4.928 22.4ZM3.616 19.2C3.36 18.176 3.2 17.104 3.2 16C3.2 14.896 3.36 13.824 3.616 12.8H9.024C8.896 13.856 8.8 14.912 8.8 16C8.8 17.088 8.896 18.144 9.024 19.2M16 3.248C17.328 5.168 18.4 7.312 19.056 9.6H12.944C13.6 7.312 14.672 5.168 16 3.248ZM27.072 9.6H22.352C21.8505 7.61858 21.109 5.70577 20.144 3.904C23.088 4.912 25.536 6.944 27.072 9.6ZM16 0C7.152 0 0 7.2 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C6.17203 28.7994 7.93586 29.978 9.87706 30.7821C11.8183 31.5861 13.8989 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/vintageplayer" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/artsofbaniya" className="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
                                        {' '}
                                        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>{' '}
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="group block text-center lg:w-1/4 sm:w-1/3 min-[450px]:w-1/2 w-full">
                        <div className="relative mb-5">
                            <img
                                src="/gautam.jpeg"
                                alt="gautam image"
                                className="w-64 h-64 rounded-2xl object-cover mx-auto ransition-all duration-500 rounded-tl-[100px] border-2 border-solid border-transparent group-hover:border-indigo-600"
                            />
                        </div>
                        <h4 className="text-[24px] font-poppins  text-gray-900 font-medium text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
                            Gautam
                        </h4>
                        <span className="text-gray-500 font-mono text-[16px] text-center block transition-all duration-500 group-hover:text-gray-900">
                            CHIEF EYE STRAINING OFFICER
                        </span>
                        <ul className="flex justify-center mt-4 space-x-4">
                            <li>
                                <a href="https://www.linkedin.com/in/gautam-sabhahit-8a7835100?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                        {' '}
                                        <path
                                            fill="#0288D1"
                                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                        ></path>{' '}
                                    </svg>{' '}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22.976 19.2C23.104 18.144 23.2 17.088 23.2 16C23.2 14.912 23.104 13.856 22.976 12.8H28.384C28.64 13.824 28.8 14.896 28.8 16C28.8 17.104 28.64 18.176 28.384 19.2M20.144 28.096C21.104 26.32 21.84 24.4 22.352 22.4H27.072C25.5219 25.0692 23.0626 27.0912 20.144 28.096ZM19.744 19.2H12.256C12.096 18.144 12 17.088 12 16C12 14.912 12.096 13.84 12.256 12.8H19.744C19.888 13.84 20 14.912 20 16C20 17.088 19.888 18.144 19.744 19.2ZM16 28.736C14.672 26.816 13.6 24.688 12.944 22.4H19.056C18.4 24.688 17.328 26.816 16 28.736ZM9.6 9.6H4.928C6.46183 6.92325 8.91945 4.89799 11.84 3.904C10.88 5.68 10.16 7.6 9.6 9.6ZM4.928 22.4H9.6C10.16 24.4 10.88 26.32 11.84 28.096C8.92523 27.0917 6.47086 25.0691 4.928 22.4ZM3.616 19.2C3.36 18.176 3.2 17.104 3.2 16C3.2 14.896 3.36 13.824 3.616 12.8H9.024C8.896 13.856 8.8 14.912 8.8 16C8.8 17.088 8.896 18.144 9.024 19.2M16 3.248C17.328 5.168 18.4 7.312 19.056 9.6H12.944C13.6 7.312 14.672 5.168 16 3.248ZM27.072 9.6H22.352C21.8505 7.61858 21.109 5.70577 20.144 3.904C23.088 4.912 25.536 6.944 27.072 9.6ZM16 0C7.152 0 0 7.2 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C6.17203 28.7994 7.93586 29.978 9.87706 30.7821C11.8183 31.5861 13.8989 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/lazycoder1" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/gautam_sabhahit?s=11" className="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
                                        {' '}
                                        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>{' '}
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="group block text-center lg:w-1/4 sm:w-1/3 min-[450px]:w-1/2 w-full">
                        <div className="relative mb-5">
                            <img
                                src="/piyush.jpg"
                                alt="piyush image"
                                className="w-64 h-64 rounded-2xl object-cover mx-auto ransition-all duration-500 rounded-tl-[100px] border-2 border-solid border-transparent group-hover:border-indigo-600"
                            />
                        </div>
                        <h4 className="text-[24px] text-gray-900 font-medium font-poppins text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
                            Piyush
                        </h4>
                        <span className="text-gray-500 font-mono text-[16px] text-center block transition-all duration-500 group-hover:text-gray-900">
                            DESIGN MAVEN
                        </span>
                        <ul className="flex justify-center mt-4 space-x-4">
                            <li>
                                <a href="https://www.linkedin.com/in/piyushpetkar/" className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                        {' '}
                                        <path
                                            fill="#0288D1"
                                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                        ></path>{' '}
                                    </svg>{' '}
                                </a>
                            </li>
                            <li>
                                <a href="https://p3petkar.notion.site/Hey-Piyush-here-9f23d7e29bd4499b8b7a93bc7d17bc12" className="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22.976 19.2C23.104 18.144 23.2 17.088 23.2 16C23.2 14.912 23.104 13.856 22.976 12.8H28.384C28.64 13.824 28.8 14.896 28.8 16C28.8 17.104 28.64 18.176 28.384 19.2M20.144 28.096C21.104 26.32 21.84 24.4 22.352 22.4H27.072C25.5219 25.0692 23.0626 27.0912 20.144 28.096ZM19.744 19.2H12.256C12.096 18.144 12 17.088 12 16C12 14.912 12.096 13.84 12.256 12.8H19.744C19.888 13.84 20 14.912 20 16C20 17.088 19.888 18.144 19.744 19.2ZM16 28.736C14.672 26.816 13.6 24.688 12.944 22.4H19.056C18.4 24.688 17.328 26.816 16 28.736ZM9.6 9.6H4.928C6.46183 6.92325 8.91945 4.89799 11.84 3.904C10.88 5.68 10.16 7.6 9.6 9.6ZM4.928 22.4H9.6C10.16 24.4 10.88 26.32 11.84 28.096C8.92523 27.0917 6.47086 25.0691 4.928 22.4ZM3.616 19.2C3.36 18.176 3.2 17.104 3.2 16C3.2 14.896 3.36 13.824 3.616 12.8H9.024C8.896 13.856 8.8 14.912 8.8 16C8.8 17.088 8.896 18.144 9.024 19.2M16 3.248C17.328 5.168 18.4 7.312 19.056 9.6H12.944C13.6 7.312 14.672 5.168 16 3.248ZM27.072 9.6H22.352C21.8505 7.61858 21.109 5.70577 20.144 3.904C23.088 4.912 25.536 6.944 27.072 9.6ZM16 0C7.152 0 0 7.2 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C6.17203 28.7994 7.93586 29.978 9.87706 30.7821C11.8183 31.5861 13.8989 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/p3petkar" className="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
                                        {' '}
                                        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>{' '}
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="group block text-center lg:w-1/4 sm:w-1/3 min-[450px]:w-1/2 w-full">
                        <div className="relative mb-5">
                            <img
                                src="/sushaan.jpg"
                                alt="Sushaan image"
                                className="w-64 h-64 rounded-2xl object-cover mx-auto ransition-all duration-500 rounded-tl-[100px] border-2 border-solid border-transparent group-hover:border-indigo-600"
                            />
                        </div>
                        <h4 className="text-[24px] text-gray-900 font-medium font-poppins text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
                            Sushaan
                        </h4>
                        <span className="text-gray-500 font-mono text-[16px] text-center block transition-all duration-500 group-hover:text-gray-900">
                            FULLSTACK EXPLORER
                        </span>
                        <ul className="flex justify-center mt-4 space-x-4">
                            <li>
                                <a href="#" className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                        {' '}
                                        <path
                                            fill="#0288D1"
                                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                        ></path>{' '}
                                    </svg>{' '}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22.976 19.2C23.104 18.144 23.2 17.088 23.2 16C23.2 14.912 23.104 13.856 22.976 12.8H28.384C28.64 13.824 28.8 14.896 28.8 16C28.8 17.104 28.64 18.176 28.384 19.2M20.144 28.096C21.104 26.32 21.84 24.4 22.352 22.4H27.072C25.5219 25.0692 23.0626 27.0912 20.144 28.096ZM19.744 19.2H12.256C12.096 18.144 12 17.088 12 16C12 14.912 12.096 13.84 12.256 12.8H19.744C19.888 13.84 20 14.912 20 16C20 17.088 19.888 18.144 19.744 19.2ZM16 28.736C14.672 26.816 13.6 24.688 12.944 22.4H19.056C18.4 24.688 17.328 26.816 16 28.736ZM9.6 9.6H4.928C6.46183 6.92325 8.91945 4.89799 11.84 3.904C10.88 5.68 10.16 7.6 9.6 9.6ZM4.928 22.4H9.6C10.16 24.4 10.88 26.32 11.84 28.096C8.92523 27.0917 6.47086 25.0691 4.928 22.4ZM3.616 19.2C3.36 18.176 3.2 17.104 3.2 16C3.2 14.896 3.36 13.824 3.616 12.8H9.024C8.896 13.856 8.8 14.912 8.8 16C8.8 17.088 8.896 18.144 9.024 19.2M16 3.248C17.328 5.168 18.4 7.312 19.056 9.6H12.944C13.6 7.312 14.672 5.168 16 3.248ZM27.072 9.6H22.352C21.8505 7.61858 21.109 5.70577 20.144 3.904C23.088 4.912 25.536 6.944 27.072 9.6ZM16 0C7.152 0 0 7.2 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C6.17203 28.7994 7.93586 29.978 9.87706 30.7821C11.8183 31.5861 13.8989 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/issa-me-sush" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/luniacllama" className="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
                                        {' '}
                                        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>{' '}
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="group block lg:-mr-20 text-center lg:w-1/3 sm:w-1/3 min-[450px]:w-1/2 w-full">
                        <div className="relative mb-5">
                            <img
                                src="/ojas.jpg"
                                alt="Ojas image"
                                className="w-64 h-64 rounded-2xl object-cover mx-auto ransition-all duration-500 rounded-tl-[100px] border-2 border-solid border-transparent group-hover:border-indigo-600"
                            />
                        </div>
                        <h4 className="text-[24px] text-gray-900 font-medium font-poppins text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
                            Ojas
                        </h4>
                        <span className="text-gray-500 font-mono text-[16px] text-center block transition-all duration-500 group-hover:text-gray-900">
                            FRONTEND ENGINEER
                        </span>
                        <ul className="flex justify-center mt-4 space-x-4">
                            <li>
                                <a href="https://www.linkedin.com/in/ojas-palorkar/" className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                        {' '}
                                        <path
                                            fill="#0288D1"
                                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                        ></path>{' '}
                                    </svg>{' '}
                                </a>
                            </li>
                            <li>
                                <a href="https://ojas13-git.github.io/ojas_portfolio/" className="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22.976 19.2C23.104 18.144 23.2 17.088 23.2 16C23.2 14.912 23.104 13.856 22.976 12.8H28.384C28.64 13.824 28.8 14.896 28.8 16C28.8 17.104 28.64 18.176 28.384 19.2M20.144 28.096C21.104 26.32 21.84 24.4 22.352 22.4H27.072C25.5219 25.0692 23.0626 27.0912 20.144 28.096ZM19.744 19.2H12.256C12.096 18.144 12 17.088 12 16C12 14.912 12.096 13.84 12.256 12.8H19.744C19.888 13.84 20 14.912 20 16C20 17.088 19.888 18.144 19.744 19.2ZM16 28.736C14.672 26.816 13.6 24.688 12.944 22.4H19.056C18.4 24.688 17.328 26.816 16 28.736ZM9.6 9.6H4.928C6.46183 6.92325 8.91945 4.89799 11.84 3.904C10.88 5.68 10.16 7.6 9.6 9.6ZM4.928 22.4H9.6C10.16 24.4 10.88 26.32 11.84 28.096C8.92523 27.0917 6.47086 25.0691 4.928 22.4ZM3.616 19.2C3.36 18.176 3.2 17.104 3.2 16C3.2 14.896 3.36 13.824 3.616 12.8H9.024C8.896 13.856 8.8 14.912 8.8 16C8.8 17.088 8.896 18.144 9.024 19.2M16 3.248C17.328 5.168 18.4 7.312 19.056 9.6H12.944C13.6 7.312 14.672 5.168 16 3.248ZM27.072 9.6H22.352C21.8505 7.61858 21.109 5.70577 20.144 3.904C23.088 4.912 25.536 6.944 27.072 9.6ZM16 0C7.152 0 0 7.2 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C6.17203 28.7994 7.93586 29.978 9.87706 30.7821C11.8183 31.5861 13.8989 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0Z"
                                            fill="#9E9E9E"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Ojas13-git" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/_ojas_13" className="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
                                        {' '}
                                        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>{' '}
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="group block text-center lg:w-1/3 sm:w-1/3 min-[450px]:w-1/2 w-full">
                        <div className="relative mb-5">
                            <img
                                src="/samarth.jpg"
                                alt="Samarth image"
                                className="w-64 h-64 rounded-2xl object-cover mx-auto ransition-all duration-500 rounded-tl-[100px] border-2 border-solid border-transparent group-hover:border-indigo-600"
                            />
                        </div>
                        <h4 className="text-[24px] text-gray-900 font-medium font-poppins text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
                            Samarth
                        </h4>
                        <span className="text-gray-500 font-mono text-[16px] text-center block transition-all duration-500 group-hover:text-gray-900">
                            DEVREL DYNAMO
                        </span>
                        <ul className="flex justify-center mt-4 space-x-4">
                            <li>
                                <a href="https://www.linkedin.com/in/samarth-saxena-169430178/" className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                        {' '}
                                        <path
                                            fill="#0288D1"
                                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                        ></path>{' '}
                                    </svg>{' '}
                                </a>
                            </li>
                            
                            <li>
                                <a href="https://github.com/SamarthSaxena10" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/0_x_Sam" className="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
                                        {' '}
                                        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>{' '}
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="group block lg:-ml-20 text-center lg:w-1/3 sm:w-1/3 min-[450px]:w-1/2 w-full">
                        <div className="relative mb-5">
                            <img
                                src="/harsh.png"
                                alt="harsh image"
                                className="w-64 h-64 rounded-2xl object-cover mx-auto ransition-all duration-500 rounded-tl-[100px] border-2 border-solid border-transparent group-hover:border-indigo-600"
                            />
                        </div>
                        <h4 className="text-[24px] text-gray-900 font-medium font-poppins text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">
                            Harsh
                        </h4>
                        <span className="text-gray-500 font-mono text-[16px] text-center block transition-all duration-500 group-hover:text-gray-900">
                            DEVREL
                        </span>
                        <ul className="flex justify-center mt-4 space-x-4">
                            <li>
                                <a href="https://www.linkedin.com/in/harsh-kumar-125ba8200/" className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                        {' '}
                                        <path
                                            fill="#0288D1"
                                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                        ></path>{' '}
                                    </svg>{' '}
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Harshkumar62367" className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/Spectre_harsh07" className="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30">
                                        {' '}
                                        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>{' '}
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* CULTURE AND BELIEFS */}
                <div className="mb-12 mt-28 space-y-10">
                    <div className="flex items-center justify-center space-x-2">
                        <RiTeamFill className="text-[#340CD2] text-4xl scale-x-[-1] " />
                        <span className="text-xl text-[#340CD2] font-poppins font-medium">CULTURE & BELIEF</span>
                    </div>{' '}
                    
                    <p className="text-lg md:text-[48px] text-[34px] font-medium font-poppins tracking-tightest text-gray-900 text-center">Be <span className='italic font-semibold text-black font-playfair'>Outcome</span> focused 🎓</p>
                    <div className=''>    
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>As a company, our first priority is solving problems for the relevant stakeholders.</p>
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>To ensure this, we regularly reinforce the principle of being <span className='text-[#340CD2]'>outcomes focused rather than output focused.</span> </p>
                        <br />
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>We consciously chosen to work on products that are needed in the ecosystem and we enjoy building due</p>
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>to the natural curiosity that comes along with the problem/solution.</p>
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>We’re constantly learning and rediscovering ourselves, and definitely have lots more to go. </p>
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>In this long, unpredictable journey, the team is always available for each other. Whether there are any</p>
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>mental, personal, or economical concerns, or even boredom and desire to try and pursue something</p>
                        <p className='font-poppins text-sm md:text-xl text-gray-500 text-center'>different, we remain open and available to help out our teammates 🧘🏻‍♂️</p>
                        <br />
                        <br />
                    </div>  
                    <div className='space-y-1'>    
                        <p className=' text-sm md:text-[48px] font-semibold italic leading-10 font-playfair text-center text-[#340CD2]'>It’s gonna be a long journey.</p>
                        <br />
                        <p className=' text-sm md:text-[48px] font-semibold italic leading-10 font-playfair text-center text-[#340CD2]'>Might as well ensure you enjoy the work!</p>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default TeamSection2