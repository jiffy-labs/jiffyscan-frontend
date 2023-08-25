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
                <div className="absolute top-12  ml-8 text-black px-4 py-6 rounded bg-white" style={{width:"200px"}}>
                    <p style={{ color: '#607D8B', fontSize: '14px' }}>ACCOUNT</p>
                    <div className="flex gap-6 mt-2">
                        <Image src={profile} alt="" />
                        <p style={{ color: '#263238', fontSize: '16px' }}> My Profile</p>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <Image src={api} alt="" className="h-6 w-7" />
                        <p style={{ color: '#263238', fontSize: '16px'}}>API Plans</p>
                    </div>
                    <div className="flex gap-6 mt-2">
                        <Image src={key} alt="" />
                        <p style={{ color: '#263238', fontSize: '16px'}}>API Keys</p>
                    </div>
                    <hr className='mt-2'/>
                    <div className="border border-black rounded mt-4 text-center p-1 gap-2 flex align-item-center justify-center" style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
                        <Image src={menu} alt="" className="h-4 w-4 " />
                        <p style={{ fontSize: '14px' }}>SIGN OUT</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default IconButton;
