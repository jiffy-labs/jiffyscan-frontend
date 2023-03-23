import React, { ReactNode } from 'react';
import InfoButton from '../InfoButton';

export interface CaptionProps {
    children?: ReactNode;
    icon: string;
}

function Caption(props: CaptionProps) {
    const { children, icon } = props;

    return (
        <div className="flex items-center gap-2 py-2 mb-2">
            <img src={icon} alt="" />
            <span className="font-bold text-lg leading-[1.2]">{children}</span>
            <InfoButton />
        </div>
    );
}

export default Caption;
