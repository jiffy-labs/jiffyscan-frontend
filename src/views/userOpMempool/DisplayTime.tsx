import moment from 'moment';
import React from 'react';

type Props = {};

moment.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ',
        s: (number) => number + 's ',
        ss: '%ds ',
        m: '1m ',
        mm: '%dm ',
        h: '1h ',
        hh: '%dh ',
        d: '1d ',
        dd: '%dd ',
        M: 'a month ',
        MM: '%d months ',
        y: 'a year ',
        yy: '%d years ',
    },
});

const DisplayTime = ({ timestamp }: { timestamp: number }) => {
    const [show, setShow] = React.useState(false);

    return (
        <div className="flex items-center gap-[10px]" onClick={() => setShow(!show)}>
            {show ? (
                <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                    {moment.unix(timestamp).local().format()}
                </span>
            ) : (
                <span className="text-dark-600 md:text-[14px] text-[16px] break-all leading-5">
                    {moment.unix(timestamp).fromNow() +
                        ' ago' +
                        '  (' +
                        moment.unix(timestamp).local().format('YYYY-MM-DD hh:mm:ss ZZ ') +
                        ')'}
                </span>
            )}
        </div>
    );
};

export default DisplayTime;
