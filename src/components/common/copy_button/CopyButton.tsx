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
            <img className="h-[20px] w-[20px] dark:hidden" src={copyIcon || '/images/copyL.svg'} alt="" />
            <img className="h-[20px] w-[20px] hidden dark:flex" src={copyIcon || '/images/copyD.svg'} alt="" />

        </button>
    );
}
function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    toast(`copied ${text}`, 1000);
}
export default CopyButton;
