import React from 'react';
import toast from 'react-simple-toasts';
function CopyButton({ text, copyIcon }: { text: string; copyIcon?: string }) {
    return (
        <button
            onClick={() => {
                copyToClipboard(text);
            }}
            className="active:shadow-300 pd-2"
            type="button"
        >
            <img className="h-[26px] w-[20px] md:h-[24px] md:w-[24px]" src={copyIcon || '/images/Button.svg'} alt="" />
        </button>
    );
}
function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    toast(`copied ${text}`, 1000);
}
export default CopyButton;
