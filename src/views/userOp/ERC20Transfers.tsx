import LinkAndCopy from '@/components/common/LinkAndCopy';
import { shortenString } from '@/components/common/utils';
import React from 'react';

export interface ERC20Transfer {
    index: number;
    address: string | null;
    invoked: string;
    from: string;
    to: string;
    value: string;
    decimals: number | null;
    name: string | null;
    sender: string;
}

const getValue = (value: string | { type: string; hex: string }) => {
    let val = (value as any).hex ? (value as any).hex : value;
    return parseInt(val);
};

function ERC20Transfers({ index, address, invoked, from, to, value, decimals, name, sender }: ERC20Transfer) {
    if (sender && (sender == to || sender == from))
        return (
            <div key={index} className="flex">
                From: <LinkAndCopy link={null} text={shortenString(from)} copyText={from} />
                To: <LinkAndCopy link={null} text={shortenString(to)} copyText={to} />{' '}
                {name || invoked == 'ETH Transfer' ? (
                    <div>
                        Amount:
                        {(getValue(value) / 10 ** (decimals ? decimals : 18)).toFixed(4)}{' '}
                        {name ? (
                            <>
                                {' '}
                                {name} {invoked == 'ETH Transfer ' ? '' : 'Token '}
                            </>
                        ) : address ? (
                            address
                        ) : (
                            'ETH Transfer '
                        )}
                    </div>
                ) : (
                    <div>
                        Amount: {(getValue(value) / 10 ** 18).toFixed(4)}{' '}
                        {address ? <LinkAndCopy link={null} text={shortenString(to)} copyText={to} /> : ''}
                    </div>
                )}&nbsp;
                Invoked: <LinkAndCopy link={null} text={invoked} copyText={invoked} />
            </div>
        );
}

export default ERC20Transfers;
