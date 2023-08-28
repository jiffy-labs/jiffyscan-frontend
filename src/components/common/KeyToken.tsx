import Link from 'next/link';
import React, { useContext } from 'react';
import CopyButton from './copy_button/CopyButton';
import { useConfig } from '@/context/config';
import { useRouter } from 'next/router';
import { shortenString } from './utils';
import { NETWORK_SCANNER_MAP } from './constants';
import EyeButton from './copy_button/EyeButton';
import { shortenStringstar } from './utils';
export interface TokenType {
    icon?: string;
    text: string;
    copyIcon?: string;
    type?: string;
    onTokenClicked?: (value: number) => void;
    value?: number;
}

function KeyToken({ icon, text, copyIcon, type, onTokenClicked, value }: TokenType) {
    const { selectedNetwork } = useConfig();

    if (text == 'Unavailable!') return <div className="flex items-center gap-2.5">{text}</div>;

    return (
        <div className="flex items-center gap-2.5">
            {icon && <img src={icon} alt="" style={{ width: '20px', height: '20px' }} />}
            {onTokenClicked ? (
                <a onClick={() => onTokenClicked(value ? value : 0)} className="text-black cursor-pointer">
                    {shortenStringstar(text)}
                </a>
            ) : (
                <Link href={getHrefLink(type, text, selectedNetwork)} target={getTarget(type)} className="text-black">
                    {shortenStringstar(text)}
                </Link>
            )}

            {/* <CopyButton text={text} copyIcon={copyIcon} /> */}
            <EyeButton text={text} />
        </div>
    );
}

export default KeyToken;

function getHrefLink(type: string | undefined, text: string, network: string) {
    if (type == undefined) return '#';
    if (type == 'userOp') {
        return {
            pathname: `/userOpHash/${text}`,
            query: { network: network },
        };
    } else if (type == 'address') {
        return {
            pathname: `/account/${text}`,
            query: { network: network },
        };
    } else if (type == 'factory') {
        return {
            pathname: `/factory/${text}`,
            query: { network: network },
        };
    } else if (type == 'bundle') {
        return {
            pathname: `/bundle/${text}`,
            query: { network: network },
        };
    } else if (type == 'bundler') {
        return {
            pathname: `/bundler/${text}`,
            query: { network: network },
        };
    } else if (type == 'paymaster') {
        return {
            pathname: `/paymaster/${text}`,
            query: { network: network },
        };
    } else if (type == 'erc20Transfer' || type == 'erc721Transfer' || type == 'transaction') {
        return {
            pathname: NETWORK_SCANNER_MAP[network] + `/tx/${text}`,
        };
    } else {
        return '#';
    }
}

function getTarget(type: string | undefined) {
    // console.log(type)
    if (type == undefined) return '_self';

    // if (type == 'address') {
    //     return '_blank';
    // }
    if (type == 'bundle') {
        return '_self';
    } else if (type == 'erc20Transfer' || type == 'erc721Transfer' || type == 'transaction') {
        return '_blank';
    } else {
        return '_self';
    }
}
