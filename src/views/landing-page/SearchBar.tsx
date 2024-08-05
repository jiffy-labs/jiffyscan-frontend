import React, { useState } from 'react';

const SearchBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <form className="w-full max-w-[1080px] h-16 mx-auto mt-12 md:mt-48 px-4 md:px-0">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-2 flex items-center ps-3 cursor-pointer" onClick={handleDropdownToggle}>
                    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            opacity="0.2"
                            d="M5.86699 27.3333L7.60033 18.2857L0.666992 15.5714L12.8003 2L11.067 11.0476L18.0003 13.7619L5.86699 27.3333Z"
                            fill="#FFB300"
                        />
                        <path
                            d="M19.3117 12.9087C19.2796 12.7662 19.2144 12.6342 19.1219 12.5245C19.0294 12.4147 18.9125 12.3306 18.7816 12.2796L12.6729 9.8777L14.2274 1.7272C14.2626 1.53783 14.2381 1.34159 14.1576 1.16811C14.077 0.994621 13.9448 0.853297 13.781 0.765461C13.6171 0.677626 13.4304 0.648046 13.2491 0.681184C13.0678 0.714322 12.9016 0.80838 12.7758 0.949166L0.899971 14.287C0.803517 14.3935 0.733741 14.5234 0.696877 14.6651C0.660013 14.8068 0.657209 14.9559 0.688715 15.099C0.720222 15.2421 0.785058 15.3748 0.877431 15.4853C0.969804 15.5957 1.08684 15.6804 1.21807 15.7319L7.32882 18.1338L5.7786 26.2754C5.7434 26.4648 5.76792 26.661 5.84845 26.8345C5.92898 27.008 6.06116 27.1493 6.22504 27.2371C6.38891 27.325 6.5756 27.3546 6.75692 27.3214C6.93824 27.2883 7.10436 27.1942 7.23021 27.0534L19.106 13.7157C19.2007 13.6091 19.269 13.4798 19.3049 13.3391C19.3408 13.1984 19.3431 13.0506 19.3117 12.9087ZM8.02759 23.56L9.13776 17.7381C9.1775 17.5316 9.14601 17.3171 9.04892 17.1326C8.95183 16.9482 8.79543 16.8059 8.60759 16.7311L3.00475 14.5248L11.9774 4.44811L10.8682 10.2701C10.8285 10.4765 10.86 10.6911 10.9571 10.8755C11.0542 11.0599 11.2106 11.2022 11.3984 11.2771L16.997 13.4778L8.02759 23.56Z"
                            fill="#FFB300"
                        />
                    </svg>
                    <svg className={`ml-2 mr-2 transition-transform duration-200 ${
                        isDropdownOpen ? 'transform rotate-180' : ''
                    }`} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.41 0.578125L6 5.16813L10.59 0.578125L12 1.99813L6 7.99813L0 1.99813L1.41 0.578125Z" fill="#9E9E9E" />
                    </svg>
                    <div className="border-r-2 h-6 mx-2"></div>
                </div>
                
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Option 1
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Option 2
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Option 3
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
                
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-24 text-sm md:text-base text-gray-900 border border-gray-300 rounded-2xl bg-[#FFFFFF] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for a transaction using Transaction Id"
                    required
                />
                
                <p
                    className="text-[#9E9E9E] hidden md:block border absolute right-11 bottom-3.5 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg shadow-sm text-sm px-2.5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Ctrl
                </p>
                <p
                    className="text-[#9E9E9E] hidden md:block border absolute right-2.5 bottom-3.5 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg shadow-sm text-sm px-2.5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    K
                </p>
            </div>
        </form>
    );
};

export default SearchBar;
