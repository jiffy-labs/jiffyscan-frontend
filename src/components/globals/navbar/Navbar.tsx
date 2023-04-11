import React, { Fragment } from 'react';
import Link from 'next/link';
import IconButton from '@/components/common/icon_button/IconButton';
import Searchblock from '../searchblock/Searchblock';
import Pages from './pages/Pages';
import Logo from '@/components/common/Logo';
import dynamic from 'next/dynamic';
const Drawer = dynamic(
    import('react-modern-drawer').then((mod) => mod.default),
    { ssr: false },
);

import 'react-modern-drawer/dist/index.css';
import User from './User';
import Token from '@/components/common/Token';
import Copyright from '../footer/Copyright';
import Donations from '../footer/Donations';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

interface NavbarProps {
    searchbar?: boolean;
}

function Navbar(props: NavbarProps) {
    const { searchbar } = props;

    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <Fragment>
            <nav className="py-3">
                <div className="container justify-between flex items-center gap-8">
                    <div className="">
                        <Logo />
                    </div>
                    <div className="w-[1px] h-[40px] hidden md:block bg-black/[12%]" />
                    <div className="md:block hidden">
                        <Pages />
                    </div>
                    <div className="hidden md:flex items-center gap-3 flex-grow justify-end">
                        {searchbar && <Searchblock isNavbar={true} />}
                        <User />
                    </div>
                    <div className="flex md:hidden items-center">
                        <button type="button" onClick={toggleDrawer}>
                            <img src="/images/menu.svg" alt="" />
                        </button>
                    </div>
                </div>
            </nav>
            <Drawer open={isOpen} onClose={toggleDrawer} direction="left" className=" ">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-4">
                        <li>
                            <div>
                                <Link href="/" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="min-h-screen flex justify-between flex-col gap-10 p-4 pb-6">
                    <div>
                        <div className="flex justify-between gap-3 items-center mb-12">
                            <Logo />
                            <button type="button" onClick={toggleDrawer}>
                                <img className="w-6 h-5 translate-y-[1px]" src="/images/xmark-solid.svg" alt="" />
                            </button>
                        </div>
                        <div className="mb-3">
                            <Pages />
                        </div>
                        <hr className="mb-2" />
                        <div className="-ml-2">
                            <User />
                        </div>
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
