import LinkAndCopy from '@/components/common/LinkAndCopy';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import { getFee, shortenString } from '@/components/common/utils';
import { Divider } from '@mui/material';
import React from 'react';

export interface ERC20Transfer {
    key: number;
    address: string | null;
    from: string;
    to: string;
    tokenId: string;
    symbol: string;
    decimals: number | null;
    name: string | null;
    sender: string;
    selectedNetwork: string;
}

function ERC20Transfers({ key, address, symbol, from, to, tokenId, decimals, name, sender, selectedNetwork }: ERC20Transfer) {
    if (sender && (sender.toLowerCase() == to.toLowerCase() || sender.toLowerCase() == from.toLowerCase())) {
        return (
            <div key={key} className="flow-root items-center md:flex">
                <div className=''>From: <LinkAndCopy link={"/account/"+from} text={shortenString(from)} copyText={from} /></div>
                <div className=''>To: <LinkAndCopy link={"/account/"+to} text={shortenString(to)} copyText={to} />{' '}</div>
                
                    <div>
                        TokenId:&nbsp;
                        <LinkAndCopy text={tokenId} link={NETWORK_SCANNER_MAP[selectedNetwork]+"/token/"+address+"?a="+parseInt(tokenId)} copyText={null}/> {' '}
                        {symbol ? symbol : ""}{' '}
                        ({name ? <LinkAndCopy text={name} link={NETWORK_SCANNER_MAP[selectedNetwork]+"/token/"+address} copyText={null}/>: ""})
                    </div>
                <Divider className='mt-2 mr-4 md:hidden '/>
            </div>
        );
    } else return <></>;
}

export default ERC20Transfers;
