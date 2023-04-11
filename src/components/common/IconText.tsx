import React, { ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';
export interface IconTextProps {
    children?: ReactNode;
    icon: string;
    toolTip?: string;
}

function IconText(props: IconTextProps) {
    const { children, icon, toolTip } = props;

    if (toolTip) {
        return (
            <div className="flex items-center gap-2 py-2 ">
                <Tooltip title={toolTip}>
                    <img src={icon} alt="" />
                </Tooltip>
                <span className="font-normal text-am leading-5 ">{children}</span>
            </div>
        );
    } else {
        return (
            <div className="flex items-center gap-2 py-2 ">
                <img src={icon} alt="" />
                <span className="font-normal text-am leading-5 ">{children}</span>
            </div>
        );
    }
}

export default IconText;
