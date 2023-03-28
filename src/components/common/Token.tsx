import Link from 'next/link';
import React, { useContext } from 'react';
import CopyButton from './copy_button/CopyButton';
import { useConfig } from '@/context/config';
import { useRouter } from 'next/router';

function Token({ icon, text, copyIcon, type }: { icon?: string; text: string; copyIcon?: string; type?: string }) {
    const { selectedNetwork } = useConfig();
    return (
        <div className="flex items-center gap-2.5">
            {icon && <img src={icon} alt="" style={{ width: '20px', height: '20px' }} />}
            <Link href={getHrefLink(type, text, selectedNetwork)} target={getTarget(type)} className="text-blue-200">
                {shortenString(text)}
            </Link>
            <CopyButton text={text} copyIcon={copyIcon} />
        </div>
    );
}

export default Token;

function getHrefLink(type: string | undefined, text: string, network: string) {
    if (type == undefined) return '#';

    if (type == 'userOp') {
        return {
            pathname: '/userOpHash',
            query: { hash: text || '0x43fe1ef830cbc6447ca8a740963099fe7fb6b137ac7768aa9c8f5913aaf8f91b' },
        };
    } else if (type == 'address') {
        return 'https://jiffyscan.xyz/address/' + text;
    } else if (type == 'bundle') {
        return NETWORK_SCANNER_MAP[network] + text;
    } else {
        return '#';
    }
}

const NETWORK_SCANNER_MAP: { [key: string]: string } = {
    mainnet: 'https://etherscan.io/tx/',
    goerli: 'https://goerli.etherscan.io/tx/',
    mumbai: 'https://mumbai.polygonscan.com/tx/',
    matic: 'https://polygonscan.com/tx/',
    'optimism-goerli': 'https://goerli-optimism.etherscan.io/tx/',
    arbitrum: 'https://arbiscan.io/tx/',
};

function getTarget(type: string | undefined) {
    // console.log(type)
    if (type == undefined) return '_self';
    if (type == 'userOp') {
        return '_blank';
    } else if (type == 'address') {
        return '_blank';
    } else if (type == 'bundle') {
        return '_blank';
    } else {
        return '_self';
    }
}

function shortenString(str: string) {
    if (str.length <= 10) {
        return str;
    }

    const firstChars = str.slice(0, 6);
    const lastChars = str.slice(-4);

    return `${firstChars}...${lastChars}`;
}
