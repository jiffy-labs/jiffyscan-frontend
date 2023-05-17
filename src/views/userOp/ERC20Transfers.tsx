import LinkAndCopy from '@/components/common/LinkAndCopy';
import { shortenString } from '@/components/common/utils';
import React from 'react';

export interface ERC20Transfer {
    key: number;
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

function ERC20Transfers({ key, address, invoked, from, to, value, decimals, name, sender }: ERC20Transfer) {
    if (sender && (sender.toLowerCase() == to.toLowerCase() || sender.toLowerCase() == from.toLowerCase()) && getValue(value) > 0) {
        return (
            <div key={key} className="flex items-center">
                From: <LinkAndCopy link={null} text={shortenString(from)} copyText={from} />
                To: <LinkAndCopy link={null} text={shortenString(to)} copyText={to} />{' '}
                {name || invoked == 'ETH Transfer' ? (
                    <div>
                        Amount:&nbsp;
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
                    <>
                        Amount: &nbsp; {(getValue(value) / 10 ** 18).toFixed(4)}&nbsp;
                        {address ? <LinkAndCopy link={null} text={shortenString(to)} copyText={to} /> : ''}
                    </>
                )}
                &nbsp; Invoked: <LinkAndCopy link={null} text={invoked} copyText={invoked} />
            </div>
        );
    } else return <></>;
}

export default ERC20Transfers;
