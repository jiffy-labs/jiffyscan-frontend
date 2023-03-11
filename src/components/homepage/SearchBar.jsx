import React from 'react';

export default function SearchBar() {
    // Return a search bar with a dropdown menu on the left and a search button on the right
    return (
        <div className="border-2 shadow-lg h-12">
            <select>
                <option value="goerli">Goerli</option>
                <option value="sepolia">Sepolia</option>
                <option value="mainnet">Mainnet</option>
                <option value="polygon">Polygon</option>
            </select>
            <input type="text" placeholder="Search" />
            <button className="bg-black text-white">Search</button>
        </div>
    );
}
