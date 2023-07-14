import React from 'react';
import InfoButton from './InfoButton';

function Header({icon, headerText, infoText}: {icon: string, headerText: string, infoText: string}) {
    return (
        <div className="flex items-center flex-grow gap-2">
            <img src={icon} alt="" />
            <b className="text-lg font-bold">{headerText}</b>
            <InfoButton data={infoText} />
        </div>
    );
}

export default Header;
