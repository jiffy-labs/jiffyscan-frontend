import React, { ReactNode } from 'react';
import InfoButton from './InfoButton';

export interface CaptionProps {
    children?: ReactNode;
    icon: string;
    text?: string;
}

function Caption(props: CaptionProps) {
    const { children, icon, text } = props;
    return (
        <div className="flex items-center gap-2 py-2 mb-2">
            <img src={icon} alt="" />
            <span className="font-bold text-lg leading-[1.2]">{children}</span>
            {/* <span className="font-bold text-[22px] font-medium self-center'> leading-[1.2]">{children}</span> */}
            {text && <InfoButton data={text} />}
        </div>
    );
}

export default Caption;
