import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MdKeyboardArrowDown, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';
import Searchblock from '../searchblock/Searchblock';
import Pages from './pages/Pages';
import Copyright from '../footer/Copyright';
import Donations from '../footer/Donations';
import 'react-modern-drawer/dist/index.css';
import { FaGithub } from 'react-icons/fa';

const Drawer = dynamic(
    import('react-modern-drawer').then((mod) => mod.default),
    { ssr: false },
);

interface NavbarProps {
    searchbar?: boolean;
}

function Navbar(props: NavbarProps) {
    const { searchbar } = props;
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const router = useRouter();
    const currentPath = router.pathname;

    const toggleDrawer = () => setIsOpen((prevState) => !prevState);

    return (
        <Fragment>
            <nav
                className={`py-3 px-4 bg-white h-[80px] border-b  shadow-100 dark:bg-[#1D1E1F] dark:border-[#444444] ${
                    currentPath !== '/' ? 'dark:bg-[#1F202B]' : ''
                }`}
            >
                <div className="container flex h-full items-center justify-between gap-8 px-0 space-x-4">
                    <Logo />
                    <div className={`hidden lg:block ${searchbar ? '' : 'pl-28'}`}>
                        <div className="flex space-x-12 text-xl relative">
                            <Link
                                href="/"
                                className="text-[#646D8F] font-gsans hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Home
                            </Link>

                            {/* Transactions Dropdown */}
                            <div className="relative group">
                                <Link
                                    href=""
                                    className="text-[#646D8F] flex items-center font-gsans hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Transactions <MdKeyboardArrowDown />
                                </Link>
                                <div className="absolute z-50 -left-48 hidden group-hover:flex mt-2 w-max space-x-4 bg-white dark:bg-[#1D1E1F] p-6 shadow-lg dark:bg-surface-dark border dark:border-[#3B3C40] rounded-3xl">
                                    <Link
                                        href="/recentUserOps"
                                        className="block rounded-lg border  dark:border-none bg-[#29903B] bg-opacity-10 dark:bg-[#212D28]  p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-48 h-48"
                                    >
                                        <button
                                            type="button"
                                            className="inline-block rounded font-gsans bg-primary mt-16 mr-10 text-left pb-2 pt-2.5 text-xl font-medium leading-normal text-[#29903B] dark:text-[#56B48C] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        >
                                            Recent User Ops
                                        </button>
                                    </Link>
                                    <Link
                                        href="recentBundles"
                                        className="block rounded-lg border  dark:border-none bg-[#2882A1] dark:bg-[#21262D] font-medium bg-opacity-10 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-48 h-48"
                                    >
                                        <button
                                            type="button"
                                            className="inline-block rounded font-gsans bg-primary mt-16 mr-10 text-left  pb-2 pt-2.5 text-xs font-medium leading-normal text-[#2882A1] dark:text-[#5687B4] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        >
                                            Recent Bundles
                                        </button>
                                    </Link>
                                    <Link
                                        href="/paymasters"
                                        className="block rounded-lg border  dark:border-none bg-[#B43E70] dark:bg-[#2D2535] bg-opacity-10 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-48 h-48"
                                    >
                                        <button
                                            type="button"
                                            className="inline-block rounded font-gsans bg-primary mt-16 mr-10 text-left  pb-2 pt-2.5 text-xs font-medium leading-normal text-[#B43E70] dark:text-[#C472B6] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        >
                                            Top Paymaster
                                        </button>
                                    </Link>
                                    <Link
                                        href="/bundlers"
                                        className="block rounded-lg border  dark:border-none bg-[#8F6D28] dark:bg-[#353125] bg-opacity-10 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-48 h-48"
                                    >
                                        <button
                                            type="button"
                                            className="inline-block rounded font-gsans bg-primary mt-16 mr-10 text-left  pb-2 pt-2.5 text-xs font-medium leading-normal text-[#8F6D28] dark:text-[#C4C172] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        >
                                            Top Bundlers
                                        </button>
                                    </Link>
                                    <Link
                                        href="/factories"
                                        className="block rounded-lg border dark:border-none bg-[#4F288F] dark:bg-[#2D2420] bg-opacity-10 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-48 h-48"
                                    >
                                        <button
                                            type="button"
                                            className="inline-block rounded font-gsans bg-primary mt-24 mr-10 text-left pb-2 pt-2.5 text-xs font-medium leading-normal text-[#4F288F] dark:text-[#B96447] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        >
                                            Factories
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Pricing Link */}
                            <Link
                                href="https://www.jiffylabs.xyz/pricing"
                                className="text-[#646D8F] flex font-gsans hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                Pricing
                                <img src="/images/sparkle.svg" alt="" className="-mt-2" />
                            </Link>

                            {/* Tools Dropdown */}
                            <div className="relative group">
                                <Link
                                    href=""
                                    className="text-[#646D8F] flex items-center font-gsans hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Tools <MdKeyboardArrowDown />
                                </Link>
                                <div className="absolute z-50 -left-96 hidden group-hover:flex mt-2 w-max space-x-4 bg-white dark:bg-[#1D1E1F] p-6 shadow-lg dark:bg-surface-dark border dark:border-[#3B3C40] rounded-3xl">
                                    <Link
                                        href="https://github.com/jiffy-labs"
                                        target="_blank"
                                        className="block rounded-lg border  dark:border-none bg-[#29903B] bg-opacity-25 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-72"
                                    >
                                        <FaGithub className="w-10 h-10 mt-8 fill-[#29903B]" />
                                        <button
                                            type="button"
                                            className="inline-block rounded font-gsans bg-primary  pb-2 pt-2.5 text-xs font-medium leading-normal text-[#29903B] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        >
                                            Github
                                        </button>
                                    </Link>
                                    <Link
                                        href="https://jiffyscan.mintlify.app/welcome"
                                        className="block rounded-lg border  dark:border-none bg-[#B43E70] bg-opacity-20 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-72"
                                    >
                                        <svg
                                            width="47"
                                            height="46"
                                            viewBox="0 0 47 46"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mt-8"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M34.4878 0.444703C34.5544 0.283196 34.6776 0.151493 34.8343 0.0741968C34.9909 -0.0030992 35.1703 -0.0207011 35.339 0.0246793L38.2782 0.827327C38.4466 0.873833 38.5923 0.980071 38.6881 1.12619C38.7839 1.27231 38.8232 1.44833 38.7987 1.62134L38.4335 4.19039C40.0181 5.10236 41.295 6.41709 42.1693 7.9591L44.7432 7.61387C44.9173 7.59067 45.0938 7.63199 45.2395 7.73004C45.3852 7.82808 45.49 7.97608 45.5341 8.14609L46.3106 11.092C46.3545 11.2618 46.3348 11.4417 46.2554 11.598C46.176 11.7543 46.0422 11.8761 45.8792 11.9407L43.475 12.9073C43.4767 14.7093 42.995 16.4788 42.0802 18.031L43.6619 20.088C43.7688 20.2268 43.8213 20.3998 43.8096 20.5746C43.798 20.7494 43.723 20.914 43.5986 21.0374L41.4388 23.1806C41.3148 23.3042 41.1499 23.3781 40.9752 23.3887C40.8004 23.3993 40.6279 23.3458 40.4898 23.2382L38.445 21.6329C36.8865 22.5345 35.1147 23.0014 33.3144 22.985L32.3251 25.3872C32.2584 25.5487 32.1352 25.6804 31.9786 25.7577C31.8219 25.835 31.6425 25.8526 31.4738 25.8072L28.5346 25.0075C28.3652 24.9615 28.2184 24.855 28.1219 24.7082C28.0255 24.5614 27.9861 24.3844 28.0112 24.2106L28.3793 21.6415C26.8196 20.7421 25.5295 19.4406 24.6435 17.8728L22.0696 18.218C21.8955 18.2412 21.719 18.1999 21.5733 18.1019C21.4276 18.0038 21.3228 17.8558 21.2787 17.6858L20.5022 14.7399C20.4584 14.5701 20.478 14.3902 20.5574 14.2339C20.6369 14.0776 20.7707 13.9558 20.9336 13.8912L23.3379 12.9246C23.3361 11.1226 23.8178 9.35315 24.7327 7.80087L23.1509 5.7439C23.0441 5.6051 22.9916 5.43206 23.0032 5.25726C23.0149 5.08246 23.0899 4.91792 23.2142 4.79454L25.374 2.65127C25.4981 2.52775 25.663 2.45376 25.8377 2.44316C26.0124 2.43257 26.185 2.48611 26.3231 2.59373L28.3678 4.19902C29.9264 3.29743 31.6981 2.8305 33.4985 2.84689L34.4878 0.444703ZM38.9569 14.4263C38.7586 15.1555 38.4187 15.8384 37.9566 16.4361C37.4945 17.0339 36.9192 17.5347 36.2636 17.9101C35.608 18.2854 34.8849 18.5279 34.1356 18.6237C33.3863 18.7194 32.6255 18.6667 31.8966 18.4683C31.1677 18.27 30.485 17.93 29.8874 17.4677C29.2899 17.0054 28.7892 16.4299 28.414 15.7741C27.6562 14.4496 27.4555 12.8782 27.8559 11.4056C28.2564 9.93301 29.2252 8.67987 30.5493 7.92185C31.8733 7.16383 33.4442 6.96301 34.9163 7.36358C36.3884 7.76416 37.6411 8.7333 38.3988 10.0578C39.1566 11.3823 39.3574 12.9537 38.9569 14.4263ZM16.9476 17.8642C16.9266 17.6902 16.8428 17.5299 16.712 17.4134C16.5812 17.2969 16.4124 17.2321 16.2373 17.2313H13.1917C13.0165 17.2313 12.8473 17.2954 12.716 17.4114C12.5846 17.5274 12.5002 17.6874 12.4784 17.8613L12.1621 20.3929C10.8944 20.6811 9.68476 21.182 8.58447 21.8745L6.57134 20.3095C6.43326 20.2019 6.26067 20.1484 6.08595 20.159C5.91122 20.1695 5.74636 20.2435 5.62229 20.3671L3.46823 22.5218C3.34476 22.646 3.27079 22.8109 3.2602 22.9857C3.24961 23.1604 3.30313 23.3331 3.41072 23.4712L4.97521 25.485C4.28291 26.5857 3.78212 27.7958 3.49412 29.0638L0.96332 29.3803C0.789953 29.402 0.630406 29.486 0.514496 29.6168C0.398586 29.7476 0.334244 29.9161 0.333496 30.0909V33.1346C0.333546 33.3099 0.397572 33.4791 0.513547 33.6105C0.629522 33.7419 0.789463 33.8264 0.96332 33.8481L3.49412 34.1645C3.78458 35.4534 4.29362 36.6588 4.97521 37.7434L3.41072 39.7572C3.30313 39.8953 3.24961 40.068 3.2602 40.2427C3.27079 40.4175 3.34476 40.5824 3.46823 40.7066L5.62229 42.8613C5.74636 42.9848 5.91122 43.0588 6.08595 43.0694C6.26067 43.08 6.43326 43.0265 6.57134 42.9189L8.58447 41.3539C9.66869 42.0357 10.8737 42.5449 12.1621 42.8354L12.4784 45.3671C12.4995 45.541 12.5832 45.7013 12.714 45.8179C12.8448 45.9344 13.0136 45.9992 13.1888 46H16.2315C16.4067 46 16.5759 45.9359 16.7072 45.8199C16.8385 45.7039 16.923 45.5439 16.9447 45.37L17.2611 42.8383C18.5287 42.5502 19.7384 42.0493 20.8387 41.3567L22.8518 42.9217C22.9899 43.0294 23.1625 43.0829 23.3372 43.0723C23.512 43.0617 23.6768 42.9877 23.8009 42.8642L25.955 40.7094C26.0784 40.5853 26.1524 40.4204 26.163 40.2456C26.1736 40.0708 26.1201 39.8982 26.0125 39.7601L24.448 37.7463C25.1296 36.6617 25.6386 35.4563 25.9291 34.1674L28.4599 33.851C28.6338 33.8299 28.794 33.7461 28.9105 33.6153C29.027 33.4845 29.0917 33.3156 29.0926 33.1404V30.0966C29.0925 29.9214 29.0285 29.7522 28.9125 29.6208C28.7965 29.4894 28.6366 29.4049 28.4627 29.3832L25.9319 29.0667C25.6439 27.7986 25.1431 26.5886 24.4508 25.4879L26.0153 23.4741C26.1229 23.336 26.1764 23.1633 26.1659 22.9885C26.1553 22.8137 26.0813 22.6488 25.9578 22.5247L23.8009 20.3671C23.6768 20.2435 23.512 20.1695 23.3372 20.159C23.1625 20.1484 22.9899 20.2019 22.8518 20.3095L20.8387 21.8745C19.7391 21.1833 18.5304 20.6833 17.264 20.3958L16.9476 17.8642ZM21.9028 31.6156C21.9028 33.5231 21.1453 35.3525 19.797 36.7013C18.4486 38.0501 16.6199 38.8078 14.713 38.8078C12.8062 38.8078 10.9774 38.0501 9.6291 36.7013C8.28075 35.3525 7.52326 33.5231 7.52326 31.6156C7.52326 29.7081 8.28075 27.8788 9.6291 26.53C10.9774 25.1812 12.8062 24.4234 14.713 24.4234C16.6199 24.4234 18.4486 25.1812 19.797 26.53C21.1453 27.8788 21.9028 29.7081 21.9028 31.6156Z"
                                                fill="#B43E70"
                                            />
                                        </svg>

                                        <button
                                            type="button"
                                            className="inline-block rounded font-gsans bg-primary  pb-2 pt-2.5 text-xs font-medium leading-normal text-[#B43E70] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        >
                                            API Reference
                                        </button>
                                    </Link>
                                    <Link
                                        href="https://t.me/+ZJejkXFlMAA4NzZl"
                                        className="block rounded-lg border dark:border-none bg-[#8F6D28] bg-opacity-25 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-72"
                                    >
                                        <svg
                                            width="35"
                                            height="45"
                                            viewBox="0 0 35 45"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mt-8"
                                        >
                                            <path
                                                d="M34.6665 5.625V45H0.666504V5.625H11.9998C11.9998 4.84863 12.1474 4.12354 12.4425 3.44971C12.7377 2.77588 13.1435 2.17529 13.66 1.64795C14.1765 1.12061 14.7741 0.717773 15.453 0.439453C16.1318 0.161133 16.8696 0.0146484 17.6665 0C18.4486 0 19.1791 0.146484 19.8579 0.439453C20.5367 0.732422 21.1418 1.13525 21.673 1.64795C22.2043 2.16064 22.6101 2.75391 22.8905 3.42773C23.1708 4.10156 23.3184 4.83398 23.3332 5.625H34.6665ZM9.1665 11.25H26.1665V8.4375H20.4998V5.625C20.4998 5.22949 20.4261 4.86328 20.2785 4.52637C20.1309 4.18945 19.9317 3.89648 19.6808 3.64746C19.43 3.39844 19.1274 3.19336 18.7733 3.03223C18.4191 2.87109 18.0502 2.79785 17.6665 2.8125C17.2681 2.8125 16.8991 2.88574 16.5597 3.03223C16.2203 3.17871 15.9252 3.37646 15.6743 3.62549C15.4234 3.87451 15.2169 4.1748 15.0545 4.52637C14.8922 4.87793 14.8184 5.24414 14.8332 5.625V8.4375H9.1665V11.25ZM17.6665 33.75H14.8332V36.5625H17.6665V33.75ZM17.6665 16.875H14.8332V30.9375H17.6665V16.875Z"
                                                fill="#8F6D28"
                                            />
                                        </svg>

                                        <button
                                            type="button"
                                            className="inline-block rounded font-gsans bg-primary  pb-2 pt-2.5 text-xs font-medium leading-normal text-[#8F6D28] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        >
                                            Faced any Issue?
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="items-center justify-end flex-grow hidden gap-3 md:flex">
                        {searchbar && <Searchblock isNavbar={true} />}
                        <div className="flex justify-center items-center">
                            {/* Left Icon for Light Mode */}
                            <span>
                                <MdOutlineLightMode className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            </span>

                            {/* Switch Container */}
                            <div
                                onClick={toggleTheme}
                                className={`w-14 h-7 flex items-center rounded-full mx-3 px-1 cursor-pointer ${
                                    isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                                }`}
                            >
                                {/* Switch */}
                                <div
                                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                                        isDarkMode ? 'translate-x-7' : ''
                                    }`}
                                ></div>
                            </div>

                            {/* Right Icon for Dark Mode */}
                            <span>
                                <MdOutlineDarkMode className={`h-6 w-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button type="button" onClick={toggleDrawer}>
                            <img src="/images/menu.svg" alt="Menu" />
                        </button>
                        <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none">
                            {isDarkMode ? <MdOutlineLightMode className="w-6 h-6 fill-white" /> : <MdOutlineDarkMode className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            <Drawer open={isOpen} onClose={toggleDrawer} direction="left">
                <div className="flex flex-col justify-between min-h-screen gap-10 p-4 pb-6">
                    <Logo />
                    <Pages />
                    <div className="flex flex-col gap-1 justify-start text-dark-600/75">
                        <Copyright />
                        <Donations />
                    </div>
                </div>
            </Drawer>
        </Fragment>
    );
}

export default Navbar;
