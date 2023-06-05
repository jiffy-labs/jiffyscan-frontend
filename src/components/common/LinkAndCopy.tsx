import { Link } from '@mui/material';
import React from 'react';
import { NETWORK_SCANNER_MAP } from './constants';
import CopyButton from './copy_button/CopyButton';

const LinkAndCopy = ({ link, text, copyText, secondaryTargetLink }: { link: string | null; text: string; copyText: string | null, secondaryTargetLink?: string }) => {
    return (
        <div className="flex items-center gap-[10px]" style={{"display": "inline-flex"}}>
            {link ? (
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
            ) : (
                <span className="text-blue-200 md:text-[14px] text-[16px] break-all leading-5">{text}</span>
            )}

            { copyText && <div className="w-[30px] flex">
                <CopyButton text={copyText} />
            </div> }

            {secondaryTargetLink &&  <Link
                underline="hover"
                // color="text.primary"
                href={secondaryTargetLink}
                aria-current="page"
                className="text-blue-200 "
                target={'_blank'}
            >
                <button className="outline-none md:block hidden focus:outline-none ring-0 focus:ring-0">
                    <img src="/images/share.svg" alt="" />
                </button>
            </Link>
}
        </div>
    );
};

export default LinkAndCopy;
