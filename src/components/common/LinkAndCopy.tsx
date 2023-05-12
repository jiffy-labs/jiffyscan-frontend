import { Link } from '@mui/material';
import React from 'react';
import { NETWORK_SCANNER_MAP } from './constants';
import CopyButton from './copy_button/CopyButton';

const LinkAndCopy = ({ link, text, copyText }: { link: string; text: string; copyText: string }) => {
    return (
        <div className="flex items-center gap-[10px]">
            <Link
                underline="hover"
                // color="text.primary"
                href={link}
                aria-current="page"
                className="text-blue-200"
                target="_blank"
            >
                <span className="text-blue-200 md:text-[14px] text-[16px] break-all leading-5">{text}</span>
            </Link>

            <div className="w-[40px] flex">
                <CopyButton text={copyText} />
            </div>
        </div>
    );
};

export default LinkAndCopy;
