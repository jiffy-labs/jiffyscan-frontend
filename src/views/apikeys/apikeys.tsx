import React, { useState, useRef, useEffect } from 'react';
import Footer from '@/components/global/footer/Footer';
import Navbar from '@/components/global/navbar/Navbar';
import circle from '../../../public/images/circle.png';
import Rcircle from '../../../public/images/r-circle.png';
import copy from '../../../public/images/content-copy.svg';
import eye from '../../../public/images/eye.png';
import plus from '../../../public/images/plus.png';
import bell from '../../../public/images/bell.png';
import shortBell from '../../../public/images/short-bell.png';
import dot from '../../../public/images/dot.png';
import pen from '../../../public/images/pen.png';
import api from '../../../public/images/api.png';
import arrow from '../../../public/images/uparrow.png';
import refresh from '../../../public/images/refresh.png';
import trash from '../../../public/images/delete.png';
import Image from 'next/image';
import ApexLineChart from './apexchart';
import ApiKeybutton from '@/components/common/buttons/ApiKeybutton';
import Firstkey from './Firstkey';
import Secondkey from './Secondkey';

const ApiKeys1Component = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef: any = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as any)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="hello">
                <Navbar searchbar />
                <div className="container py-3 px-[16px] w-full">
                    <p style={{ fontSize: '34px', fontWeight: 'bolder' }}>API Keys</p>

                    <ApiKeybutton />
                    <Firstkey />
                </div>
            </div>
            <Secondkey />

            <div className="hello">
                <div className="container py-3 px-[16px] w-full">
                    <Firstkey />
                </div>
            </div>

            <div className="mt-20">
                <Footer />
            </div>

            <style>
                {`
                    @media (max-width:991px) {
                   .container{
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                    max-width: 100%
                   }
                   
                }
                `}
            </style>
        </>
    );
};

export default ApiKeys1Component;
