import React from 'react';
import Image from 'next/image';
import copy from '../../../public/images/copy.png';

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
            <div className="px-24 container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className=" first-text text-white text-xl font-weight-bold">jiffyscan.xyz@2023</p>
                <div style={{ display: 'flex', gap: 10 }}>
                    <p className=" text-white text-xl font-weight-bold">❤ Donations: 0x37b415...C8392f </p>
                    <Image src={copy} onClick={handleCopyClick} width={22} alt="" />
                </div>
            </div>

            <style>
                {`
                   
                    @media (max-width: 576px) {
                    .container {
                    // padding: 0 10px ;
                    flex-direction:column;
                    }
                      }
            
                      @media (min-width: 576px) and (max-width: 768px) {
                        .container {
                            padding: 0 10px;
                            margin-top:-40px;
                            }
                      }
            
                      @media (min-width: 768px) and (max-width: 992px) {
                       .container{
                        padding: 0 10px;
                       }
                      }
            
                    `}
            </style>
        </>
    );
};

export default MiniFooter;
