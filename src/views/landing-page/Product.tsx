/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import React, { useState } from 'react';


const DiagonalArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2 sm:block md:block">
        <path d="M5 19L19 5M19 5H9M19 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Product = () => {
    const [hoveredCard, setHoveredCard] = useState<'paymaster' | 'bundler' | 'dataapis' | null>(null);

    return (
        <div className="md:mt-36  container mx-auto p-8 relative">
            <div className="hidden md:block relative h-80">
                <img
                    src="/Default.svg"
                    alt="Initial Flow Diagram"
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                        !hoveredCard ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                <img
                    src="/Paymaster2.svg"
                    alt="Paymaster Hover Flow Diagram"
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                        hoveredCard === 'paymaster' ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                <img
                    src="/Bundler2.svg"
                    alt="Bundler Hover Flow Diagram"
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                        hoveredCard === 'bundler' ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                <img
                    src="/DataAPI2.svg"
                    alt="DataAPIs Hover Flow Diagram"
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                        hoveredCard === 'dataapis' ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            </div>

            <div className={`mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${hoveredCard ? 'hovered' : ''}`}>
                <div
                    className={`group relative bg-[#E3E8FE] border-[#B9AEF8] border p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full h-full md:w-[340px] md:h-[233px] mx-auto ${
                        hoveredCard && hoveredCard !== 'paymaster' ? 'grayscale' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard('paymaster')}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    <div className="flex items-center mb-4">
                        <img src="/Paymaster_Inactive.svg" alt="P" className="w-8 h-8 mr-2 group-hover:hidden" />
                        <img src="/Paymaster.svg" alt="Paymaster Gif" className="w-8 h-8 mr-2 hidden group-hover:block" />
                        <h2 className="text-2xl text-[#4913E4] md:text-[32px] font-poppins font-medium">Paymaster</h2>
                    </div>
                    <p className="text-[#5B5976] text-md font-poppins">
                    Unlock seamless user experiences with Paymaster by sponsoring transaction fees.                    </p>
                    <Link
                        href="https://jiffyscan.mintlify.app/Quickstart/paymaster"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#4913E4] text-xl items-center z-20 p-2 font-sans text-white w-[208px] h-[42px] mt-6 flex"
                    >
                        Paymaster Docs <DiagonalArrowIcon />
                    </Link>
                </div>

                <div
                    className={`group relative bg-[#FDD5C3] border border-[#F2AF8A] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full h-full md:w-[340px] md:h-[233px] mx-auto ${
                        hoveredCard && hoveredCard !== 'bundler' ? 'grayscale' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard('bundler')}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    <div className="flex items-center mb-4">
                        <img src="/Bundle_Inactive.svg" alt="Logo" className="w-8 h-8 mr-2 group-hover:hidden" />
                        <img src="/Bundler.svg" alt="Paymaster Gif" className="w-8 h-8 mr-2 hidden group-hover:block" />
                        <h2 className="text-2xl text-[#D25712] md:text-[32px] font-poppins font-medium">Bundler</h2>
                    </div>
                    <p className="text-[#5B5976] text-md font-poppins">
                    Batch multiple transactions into one with Bundler, making dApp operations faster and economical. </p>
                    <Link
                        href="https://jiffyscan.mintlify.app/Quickstart/bundler"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#D25712] text-xl flex p-2 items-center font-sans text-white w-[180px] h-[42px] mt-6"
                    >
                        Bundler Docs <DiagonalArrowIcon />
                    </Link>
                </div>

                <div
                    className={`group relative bg-[#BCEFB8] border border-[#86EB6D] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full h-full md:w-[340px] md:h-[233px] mx-auto ${
                        hoveredCard && hoveredCard !== 'dataapis' ? 'grayscale' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard('dataapis')}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    <div className="flex items-center mb-4">
                        <img src="/DataAPI_inactive.svg" alt="Logo" className="w-8 h-8 mr-2 group-hover:hidden" />
                        <img src="/DataAPI.svg" alt="Paymaster Gif" className="w-8 h-8 mr-2 hidden group-hover:block" />
                        <h2 className="text-2xl md:text-[32px] text-[#0D952B] font-poppins font-medium">DataAPIs</h2>
                    </div>
                    <p className="text-[#5B5976] text-md font-poppins">
                    Enhance your application’s functionality by leveraging real-time data and analytics from diverse sources.</p>
                    <Link
                        href="https://jiffyscan.mintlify.app/Quickstart/dataapis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0D952B] text-xl flex p-2 items-center font-sans text-white w-[208px] h-[42px] mt-6"
                    >
                        Data APIs Docs <DiagonalArrowIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;


/* eslint-disable @next/next/no-img-element */

// import React, { useState } from 'react';

// const DiagonalArrowIcon = () => (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2">
//         <path d="M5 19L19 5M19 5H9M19 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
// );

// const Product = () => {
//     const [hoveredCard, setHoveredCard] = useState(null);

//     const renderFlowDiagram = () => {
//         switch (hoveredCard) {
//             case 'paymaster':
//                 return <img src="/2.svg" alt="Paymaster Hover Flow Diagram" />;
//             case 'bundler':
//                 return <img src="/3.svg" alt="Bundler Hover Flow Diagram" />;
//             case 'dataapis':
//                 return <img src="/4.svg" alt="DataAPIs Hover Flow Diagram" />;
//             default:
//                 return <img src="/Initial.svg" alt="Initial Flow Diagram" />;
//         }
//     };

//     return (
//         <div className="mt-36 container mx-auto p-8 relative">
//             <div className="hidden lg:block ml-24">
//                 {renderFlowDiagram()}
//             </div>
//             <div className="block lg:hidden text-center mb-8">
//                 {renderFlowDiagram()}
//             </div>

//             <div className={`mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${hoveredCard ? 'hovered' : ''}`}>
//                 <div
//                     className={`group relative bg-[#E3E8FE] border-[#B9AEF8] border p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full h-full mx-auto ${
//                         hoveredCard && hoveredCard !== 'paymaster' ? 'grayscale' : ''
//                     }`}
//                     onMouseEnter={() => setHoveredCard('paymaster')}
//                     onMouseLeave={() => setHoveredCard(null)}
//                 >
//                     <div className="flex items-center mb-4">
//                         <img src="/Paymaster_Inactive.svg" alt="P" className="w-8 h-8 mr-2 group-hover:hidden" />
//                         <img src="/Paymaster.svg" alt="Paymaster Gif" className="w-8 h-8 mr-2 hidden group-hover:block" />
//                         <h2 className="text-xl text-[#4913E4] md:text-2xl lg:text-[32px] font-poppins font-medium">Paymaster</h2>
//                     </div>
//                     <p className="text-gray-700 text-sm md:text-base">
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
//                     </p>
//                     <button className="bg-[#4913E4] text-base md:text-xl flex items-center p-2 font-sans text-white w-[150px] md:w-[208px] h-[42px] mt-4">
//                         Paymaster Docs <DiagonalArrowIcon />
//                     </button>
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-50 rounded-lg transition-opacity duration-300"></div>
//                 </div>

//                 <div
//                     className={`group relative bg-[#FDD5C3] border border-[#F2AF8A] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full h-full mx-auto ${
//                         hoveredCard && hoveredCard !== 'bundler' ? 'grayscale' : ''
//                     }`}
//                     onMouseEnter={() => setHoveredCard('bundler')}
//                     onMouseLeave={() => setHoveredCard(null)}
//                 >
//                     <div className="flex items-center mb-4">
//                         <img src="/Bundle_Inactive.svg" alt="Logo" className="w-8 h-8 mr-2 group-hover:hidden" />
//                         <img src="/Bundler.svg" alt="Bundler Gif" className="w-8 h-8 mr-2 hidden group-hover:block" />
//                         <h2 className="text-xl text-[#D25712] md:text-2xl lg:text-[32px] font-poppins font-medium">Bundler</h2>
//                     </div>
//                     <p className="text-gray-700 text-sm md:text-base">
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
//                     </p>
//                     <button className="bg-[#D25712] text-base md:text-xl flex items-center p-2 font-sans text-white w-[150px] md:w-[180px] h-[42px] mt-4">
//                         Bundler Docs <DiagonalArrowIcon />
//                     </button>
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-50 rounded-lg transition-opacity duration-300"></div>
//                 </div>

//                 <div
//                     className={`group relative bg-[#BCEFB8] border border-[#86EB6D] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full h-full mx-auto ${
//                         hoveredCard && hoveredCard !== 'dataapis' ? 'grayscale' : ''
//                     }`}
//                     onMouseEnter={() => setHoveredCard('dataapis')}
//                     onMouseLeave={() => setHoveredCard(null)}
//                 >
//                     <div className="flex items-center mb-4">
//                         <img src="/DataAPI_inactive.svg" alt="Logo" className="w-8 h-8 mr-2 group-hover:hidden" />
//                         <img src="/DataAPI.svg" alt="DataAPIs Gif" className="w-8 h-8 mr-2 hidden group-hover:block" />
//                         <h2 className="text-xl md:text-2xl lg:text-[32px] text-[#0D952B] font-poppins font-medium">DataAPIs</h2>
//                     </div>
//                     <p className="text-gray-700 text-sm md:text-base">
//                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
//                     </p>
//                     <button className="bg-[#0D952B] text-base md:text-xl flex items-center p-2 font-sans text-white w-[150px] md:w-[208px] h-[42px] mt-4">
//                         Data APIs Docs <DiagonalArrowIcon />
//                     </button>
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-50 rounded-lg transition-opacity duration-300"></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Product;

