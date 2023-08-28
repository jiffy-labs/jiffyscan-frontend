import React from 'react';
import toast from 'react-simple-toasts';
function EyeButton({ text, copyIcon }: { text: string; copyIcon?: string }) {
    return (
        <button className="active:shadow-300 pd-2 flex gap-2" type="button">
            <img className="h-[20px] w-[20px] md:h-[16px] md:w-[16px]" src={'/images/eyeButton.png'} alt="" />
            <img
                className="h-[20px] w-[20px] md:h-[16px] md:w-[16px]"
                src={copyIcon || '/images/Button.svg'}
                alt=""
                onClick={() => {
                    copyToClipboard(text);
                }}
            />
        </button>
    );
}
function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    toast(`copied ${text}`, 1000);
}
export default EyeButton;
