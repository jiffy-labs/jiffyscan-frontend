import React, { ReactNode } from 'react';
export interface IconTextProps {
    children?: ReactNode;
    icon: string;
}

function IconText(props: IconTextProps) {
    const { children, icon } = props;
    return (
        <div className="flex items-center gap-2 py-2 ">
            <img src={icon} alt="" />
            <span className="font-normal text-am leading-5 ">{children}</span>
        </div>
    );
}

export default IconText;
