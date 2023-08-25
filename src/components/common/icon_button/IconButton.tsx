import React, { useState } from 'react';
import Image from 'next/image';
import profile from '../../../../public/images/icon-container (2).svg';
import api from '../../../../public/images/api.png';
import key from '../../../../public/images/key.png';
import menu from '../../../../public/images/menu.png';

function IconButton({ icon }: { icon: string }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
            <button type="button" className="w-10 h-10 grid place-content-center" onClick={toggleDropdown}>
                <img src={icon} alt="" />
            </button>
            {isDropdownOpen && (
                <div className="absolute top-12 right-0 w-40 ml-8 text-black px-4 py-4 rounded bg-gray-300">
                    <p style={{ color: '#607D8B', fontSize: '14px' }}>ACCOUNT</p>
                    <div className="flex gap-1">
                        <Image src={profile} alt="" />
                        <p style={{ color: '#263238', fontSize: '16px', fontWeight: 'bold' }}> My Profile</p>
                    </div>
                    <div className="flex gap-1">
                        <Image src={api} alt="" className="h-6 w-7" />
                        <p style={{ color: '#263238', fontSize: '16px', fontWeight: 'bold' }}>API Plans</p>
                    </div>
                    <div className="flex gap-2">
                        <Image src={key} alt="" />
                        <p style={{ color: '#263238', fontSize: '16px', fontWeight: 'bold' }}>API Keys</p>
                    </div>
                    <hr />
                    <div className="border rounded mt-2 text-center p-1 font-bold gap-2 flex align-item-center">
                        <Image src={menu} alt="" className="h-5 w-5" />
                        <p style={{ fontSize: '14px' }}>SIGN OUT</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default IconButton;
