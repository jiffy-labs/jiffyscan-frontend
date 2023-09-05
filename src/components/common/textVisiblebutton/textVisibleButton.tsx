import React from 'react';

interface Props {
    isShow?: boolean;
    handleText?: (isShow?: boolean ) => void
}

function TextVisibleButton({ isShow, handleText }: Props) {

    const toggleVisibility = () => {
        if (handleText) handleText(!isShow);
    }

    return (
        <button
            onClick={toggleVisibility}
            className="active:shadow-300 pd-2"
            type="button"
        >
            <img className="h-[20px] w-[20px] md:h-[16px] md:w-[16px]" src={ isShow? '/images/eye.svg': '/images/eye.svg'} alt="" />
        </button>
    );
}
export default TextVisibleButton;
