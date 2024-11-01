import React, { ReactNode } from 'react';

export interface ChipProps {
    startIcon?: string;
    endIcon?: string;
    children: ReactNode;
    variant?: 'contained' | 'outlined' | 'primary';
    color?: 'dark-700' | 'white' | 'info' | 'success' | 'dark-400' | 'blue-700';
    className?: string;
    onClick?: () => void;
    style?: string;
    disabled?: boolean;
}

// Define variantClasses with a more specific type for better TypeScript compatibility
const variantClasses: {
    contained: {
        'dark-700': string;
        'blue-700': string;
        white: string;
        'dark-400': string;
    };
    outlined: {
        info: string;
        success: string;
    };
    primary: {
        'dark-700': string;
    };
} = {
    contained: {
        'dark-700': 'bg-dark-700 text-white border-dark-700 dark:bg-white dark:text-black',
        'blue-700': 'bg-blue-200 text-white border-dark-200',
        white: 'border-dark-100 bg-white text-dark-600 dark:bg-[#1F202B] dark:border-[#3B3C40] dark:text-white',
        'dark-400': 'border-dark-400 bg-dark-400 text-white',
    },
    outlined: {
        info: 'border-[#2196F3] bg-white text-[#2196F3]',
        success: 'border-[#4CAF50] bg-white text-[#4CAF50]',
    },
    primary: {
        'dark-700': 'bg-primary-dark-700 text-white',
    },
};

function Chip(props: ChipProps) {
    const { children, endIcon, startIcon, variant = 'contained', color = 'dark-700', className, onClick, disabled } = props;

    // Define base and disabled styles
    const baseClasses = 'flex gap-1.5 items-center px-3 py-[1px] rounded-md  h-[36px] font-gsans border text-sm text-center items-center';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    // Safely access the color class based on variant and color
    const variantColorClasses = variantClasses[variant]?.[color as keyof typeof variantClasses[typeof variant]] || '';

    return (
        <div
            className={`${baseClasses} ${variantColorClasses} ${className || ''} ${disabledClasses}`}
            role="button"
            onClick={!disabled ? onClick : undefined}
        >
            {startIcon && <img src={startIcon} alt="" style={{ height: '16px', width: '16px' }} />}
            <span className="flex-1 text-base">{children}</span>
            {endIcon && <img src={endIcon} alt="" style={{ height: '16px', width: '16px' }} />}
        </div>
    );
}

export default Chip;
