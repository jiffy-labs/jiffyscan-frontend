import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import IconButton from '@/components/common/icon_button/IconButton';
import Searchblock from '../searchblock/Searchblock';
import Pages from './pages/Pages';
import Logo from '@/components/common/Logo';
import dynamic from 'next/dynamic';
import TopBanner from './TopBanner';
const Drawer = dynamic(
    import('react-modern-drawer').then((mod) => mod.default),
    { ssr: false },
);

import 'react-modern-drawer/dist/index.css';
import User from './User';
import Token from '@/components/common/Token';
import Copyright from '../footer/Copyright';
import Donations from '../footer/Donations';
import CloseIcon from '@mui/icons-material/Close';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { Button } from '@mui/material';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
interface NavbarProps {
    searchbar?: boolean;
}

function Navbar(props: NavbarProps) {
    const { searchbar } = props;

    const [isOpen, setIsOpen] = React.useState(false);
    const [closeBanner, setCloseBanner] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        const newTheme = !isDarkMode ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', !isDarkMode); // Apply or remove 'dark' class
        localStorage.setItem('theme', newTheme); // Save the theme preference
    };

    // Set initial theme based on saved preference or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        } else {
            // If no saved theme, check for system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
            document.documentElement.classList.toggle('dark', prefersDark);
        }
    }, []);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <Fragment>
            {/* {!closeBanner && <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-dark-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1" >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-sm leading-6 text-white">
                        4 Years of Fuse Network! Congratulations 🎉🥳 
                        <strong className="font-semibold"> <a href="https://twitter.com/Fuse_network" target='_blank'>#FuseTurns4</a></strong>
                    </p>
                </div>
                <div className="flex justify-end flex-1">
                    <button type="button"  className="-m-3 p-3 focus-visible:outline-offset-[-4px] text-white" onClick={() => setCloseBanner(!closeBanner)}>
                        <CloseIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
            </div>} */}
            <nav className="py-3 px-4 bg-white h-[80px]  border-b-2 shadow-100 dark:bg-[#1D1E1F] dark:border-[#444444]">
                <div className="container flex h-full items-center justify-between gap-8 px-0 space-x-4 ">
                    <div className="">
                        <Logo />
                    </div>
                    {/* <div className="w-[1px] h-[40px] hidden md:block bg-black/[12%]" /> */}
                    <div className={`hidden lg:block ${searchbar? "" : "pl-28"}`}>
                        <Pages />
                    </div>
                    <div className="items-center justify-end flex-grow hidden gap-3 md:flex">
                        {searchbar && <Searchblock isNavbar={true} />}
                        {/* <User /> */}
                    </div>
                    <div className="items-center justify-end flex-grow hidden gap-3 md:flex">
                        <button onClick={toggleTheme} className=" p-2 rounded-full focus:outline-none">
                            {isDarkMode ? (
                                <MdOutlineLightMode className="w-6 h-6 fill-white" /> // Dark mode icon
                            ) : (
                                <MdOutlineDarkMode className="w-6 h-6" /> // Light mode icon
                            )}
                        </button>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button type="button" onClick={toggleDrawer}>
                            <img src="/images/menu.svg" alt="" />
                        </button>
                    </div>
                </div>
            </nav>
            <Drawer open={isOpen} onClose={toggleDrawer} direction="left" className="">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-4">
                        <li>
                            <div>
                                <Link href="/" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="flex flex-col justify-between min-h-screen gap-10 p-4 pb-6">
                    <div>
                        <div className="flex items-center justify-between gap-3 mb-12">
                            <Logo />
                            <button type="button" onClick={toggleDrawer}>
                                <img className="w-6 h-5 translate-y-[1px]" src="/images/xmark-solid.svg" alt="" />
                            </button>
                        </div>
                        <div className="mb-3">
                            <Pages />
                        </div>
                        <hr className="mb-2" />
                        {/* <div className="-ml-2">
                            <User />
                        </div> */}
                    </div>
                    <div className="flex flex-col gap-1 justify-start [&_span]:text-dark-600/75">
                        <Copyright />
                        <Donations />
                    </div>
                </div>
            </Drawer>
        </Fragment>
    );
}

export default Navbar;
