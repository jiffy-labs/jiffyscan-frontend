import LinkAndCopy from '@/components/common/LinkAndCopy';
import { NETWORK_SCANNER_MAP } from '@/components/common/constants';
import { getFee, shortenString } from '@/components/common/utils';
import { Divider } from '@mui/material';
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
    mini?: boolean;
}

function getValue(value: string, decimals: number | null) {
    let response: number;
    if (decimals) {
        response = parseInt(value) / 10 ** decimals;
    } else {
        response = parseInt(value) / 10 ** 18;
    }

    if (response < 0.000001) {
        return response.toExponential();
    } else {
        return response.toFixed(6);
    }
}

function ERC20Transfers({ key, address, symbol, from, to, value, decimals, name, sender, selectedNetwork, mini }: ERC20Transfer) {
    if (mini) {
        return (
            <div key={key} className="items-center flow-root md:flex ">
                <div className="">
                    {getValue(value, decimals)} (
                    {name ? (
                        <LinkAndCopy link={NETWORK_SCANNER_MAP[selectedNetwork] + '/address/' + address} text={symbol} copyText={null} />
                    ) : (
                        ''
                    )}
                    )
                </div>&nbsp;
                <div className="">
                    To: <LinkAndCopy link={'/account/' + to} text={shortenString(to)} copyText={to} />{' '}
                </div>

                
                <Divider className="mt-2 mr-4 md:hidden " />
            </div>
        );
    }
    return (
        <div key={key} className="items-center flow-root md:flex ">
            <div className="">
                From: <LinkAndCopy link={'/account/' + from} text={shortenString(from)} copyText={from} />
            </div>
            <div className="">
                To: <LinkAndCopy link={'/account/' + to} text={shortenString(to)} copyText={to} />{' '}
            </div>

            <div className="">
                Amount:&nbsp;
                {getValue(value, decimals)} {symbol ? symbol : ''} (
                {name ? (
                    <LinkAndCopy link={NETWORK_SCANNER_MAP[selectedNetwork] + '/address/' + address} text={name} copyText={null} />
                ) : (
                    ''
                )}
                )
            </div>
            <Divider className="mt-2 mr-4 md:hidden " />
        </div>
    );
}

export default ERC20Transfers;
