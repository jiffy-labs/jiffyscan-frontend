import React from 'react';
import Copyright from './footer/Copyright';
import Donations from './footer/Donations';

const MiniFooter = () => {
    const handleCopyClick = () => {
        const textToCopy: any = '❤ Donations: 0x37b415...C8392f';
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                alert('Copied to clipboard!!');
            })
            .catch(() => {
                alert('Failed to copy!!');
            });
    };
    return (
        <>
            <footer className="bg-dark-600 py-8 md:py-12 text-white">
                <div className="container flex flex-col gap-8 md:gap-12">
                    <div className=" flex md:flex-row flex-col md:justify-between md:items-center">
                        <div className="flex items-center gap-1 md:ml-0 -ml-3"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <div className="mb-6"></div>
                            <p className="text-sm"></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 md:gap-10 justify-between ">
                        <Copyright />
                        <Donations />
                    </div>
                </div>
            </footer>
        </>
    );
};

export default MiniFooter;
