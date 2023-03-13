import React from 'react';

function DesktopHeaderOptions() {
    return (
        // <div className=" w-full px-2 border-l-2 hidden lg:block bg-red-500">
        <div className="hidden lg:flex lg:flex-row  space-x-4 border-l-2 ">
            <h1 className="flex font-bold">Home</h1>
            <h1 className="flex font-bold">Blockchain</h1>
            <h1 className="flex font-bold">Developers</h1>
            <h1 className="flex font-bold">More</h1>
        </div>
        // </div>
    );
}

export default function Header() {
    return (
        <div className="flex flex-row w-full h-12 m-4">
            <div className="flex flex-row w-full justify-between lg:justify-start">
                <h1 className="flex p-2 font-bold lg:w-1/6">jiffyscan.xyz</h1>
                <h1 className="flex p-2 lg:p-0 font-bold lg:hidden">Menu</h1>
                <DesktopHeaderOptions />
                {/* <h1 className="flex font-bold">Home</h1>
                <h1 className="flex font-bold">Blockchain</h1>
                <h1 className="flex font-bold">Developers</h1>
                <h1 className="flex font-bold">More</h1> */}
            </div>
        </div>
    );
}
