import React, { ReactNode } from 'react';
import sx from './chip.module.sass';

export interface ChipProps {
    startIcon?: string;
    endIcon?: string;
    children: ReactNode;
    variant?: 'contained' | 'outlined';
    color?: 'dark-700' | 'white' | 'info' | 'success' | 'dark-400';
    className?: string;
    onClick?: () => void;
}

function Chip(props: ChipProps) {
    const { children, endIcon, startIcon, variant = 'contained', color = 'dark-700', className, onClick } = props;

    return (
        <div className={`${sx.wrapper} ${sx[variant]} ${sx[color]} ${className || ''}`} role="button" onClick={onClick}>
            {startIcon && <img src={startIcon} alt="" style={{ height: '12px', width: '12px' }} />}
            <span className="flex-1">{children}</span>
            {endIcon && <img src={endIcon} alt="" />}
        </div>
    );
}

export default Chip;
