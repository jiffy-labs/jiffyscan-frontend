import moment from 'moment';
import React from 'react';

type Props = {};

const DisplayTime = ({ timestamp }: { timestamp: number }) => {
    const [showAgo, setShowAgo] = React.useState(false);

    return (
        <div className="flex items-center gap-[10px]" onClick={() => setShowAgo(!showAgo)}>
            {showAgo ? (
                <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                    {moment.unix(timestamp).local().format()}
                </span>
            ) : (
                <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">{moment.unix(timestamp).fromNow()}</span>
            )}
        </div>
    );
};

export default DisplayTime;
