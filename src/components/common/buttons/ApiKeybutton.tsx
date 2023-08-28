import Image from 'next/image';
import React from 'react';
import plus from '../../../../public/images/plus.png';
import api from '../../../../public/images/api.png';
const ApiKeybutton = () => {
    return (
        <div style={{ display: 'flex' }} className="grid gap-2 mt-6 font-bold text-center alignItem-center">
            <div
                className="rounded border flex align-items-center justify-center gap-2 bg-black text-white text-center"
                style={{ fontSize: '14px', padding: '10px 30px' }}
            >
                <Image src={plus} alt="" className="h-3 w-3" style={{ marginTop: '4px' }} />
                <p>CREATE NEW KEY</p>
            </div>
            <div
                className="rounded border flex align-items-center justify-center text-center gap-2"
                style={{ fontSize: '14px', padding: '10px 30px' }}
            >
                <Image src={api} alt="" className="h-5 w-6" style={{ marginTop: '2px' }} />
                <p> CHECK API PLANS</p>
            </div>
        </div>
    );
};

export default ApiKeybutton;
