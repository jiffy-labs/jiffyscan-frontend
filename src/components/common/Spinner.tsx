import React from 'react';

const Spinner = ({width = '3rem', height = '3rem'}) => {
    const spinnerStyle: React.CSSProperties = {
        width,
        height,
    };
    return (
        <div
            style={spinnerStyle}
            className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent shadow-md"
        ></div>
    );
};

export default Spinner;
