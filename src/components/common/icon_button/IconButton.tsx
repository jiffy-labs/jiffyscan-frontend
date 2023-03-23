import React from 'react';

function IconButton({ icon }: { icon: string }) {
    return (
        <button type="button" className="w-10 h-10 grid place-content-center">
            <img src={icon} alt="" />
        </button>
    );
}

export default IconButton;
