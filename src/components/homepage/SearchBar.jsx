import React from 'react';

export default function SearchBar() {
    // Return a search bar with a dropdown menu on the left and a search button on the right
    return (
        <div className="flex flex-row border-2 shadow-lg h-12 w-full">
            <select className=" mx-auto">
                <option value="goerli" className="flex">
                    Goerli
                </option>
                <option value="sepolia">Sepolia</option>
                <option value="mainnet">Mainnet</option>
                <option value="polygon">Polygon</option>
            </select>
            <input
                type="text"
                placeholder="Search"
                className="flex lg:w-[563px]"
            />
            <div className="flex justify-end">
                <button className="bg-black text-white  lg:w-[128px]">
                    Search
                </button>
            </div>
        </div>
    );
}
