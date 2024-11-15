import Image from 'next/image';
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
            <Image width={20} height={20} priority className="dark:hidden" src={copyIcon || '/images/copyL.svg'} alt="" />
            <Image width={20} height={20} priority className=" hidden dark:flex" src={copyIcon || '/images/copyD.svg'} alt="" />

        </button>
    );
}
function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    toast(`copied ${text}`, 1000);
}
export default CopyButton;
