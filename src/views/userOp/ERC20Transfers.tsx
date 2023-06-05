import LinkAndCopy from '@/components/common/LinkAndCopy';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import { getFee, shortenString } from '@/components/common/utils';
import React from 'react';

export interface ERC20Transfer {
    key: number;
    address: string | null;
    symbol: string;
    from: string;
    to: string;
    value: string;
    decimals: number | null;
    name: string | null;
    sender: string;
    selectedNetwork: string;
}

function getValue (value: string, decimals: number | null) {
    let response: number;
    if (decimals) {
        response = (parseInt(value) / 10 ** decimals);
    } else {
        response = (parseInt(value) / 10 ** 18);
    }

    if (response < 0.000001) {
        return response.toExponential();
    } else {
        return response.toFixed(6);
    }
}


function ERC20Transfers({ key, address, symbol, from, to, value, decimals, name, sender, selectedNetwork }: ERC20Transfer) {
    if (sender && (sender.toLowerCase() == to.toLowerCase() || sender.toLowerCase() == from.toLowerCase())) {
        return (
            <div key={key} className="flex items-center">
                From: <LinkAndCopy link={"/account/"+from} text={shortenString(from)} copyText={from} />
                To: <LinkAndCopy link={"/account/"+to} text={shortenString(to)} copyText={to} />{' '}
                
                    <div>
                        Amount:&nbsp;
                        {getValue(value, decimals)}{' '}
                        {symbol ? symbol : ""}{' '}
                        ({name ? <LinkAndCopy  link={NETWORK_SCANNER_MAP[selectedNetwork]+"/address/"+address} text={name} copyText={null}/> : ''})
                    </div>
            </div>
        );
    } else return <></>;
}

export default ERC20Transfers;
