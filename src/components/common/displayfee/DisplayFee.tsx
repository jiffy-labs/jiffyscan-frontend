import React from 'react';
import Chip, { ChipProps } from '../chip/Chip';
import CopyButton from '../copy_button/CopyButton';
import { getFee } from '../utils';

export default function DisplayFee({ item, network }: any) {
    return (
        <div>
            <div className="flex items-center text-rgiht gap-2">
                <span>{getFee(item, network).value}</span>
                <Chip variant="outlined" color={getFee(item, network).gas.color as ChipProps['color']}>
                    {getFee(item, network).gas.children}
                </Chip>
                <CopyButton text={getFee(item, item.network).value} />
            </div>
        </div>
    );
}
