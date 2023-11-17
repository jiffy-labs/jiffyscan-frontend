import React, { useEffect, useState } from 'react';
import { resolveBNSAddress } from '../common/apiCalls/jiffyApis';
import { useConfig } from '@/context/config';

function Address({ text }: any) {
    const { selectedNetwork } = useConfig();

    const [resolvedAddress, setResolvedAddress] = useState(text);

    useEffect(() => {
        const resolveAddress = async (address: String | undefined | null) => {
            const name = await resolveBNSAddress(address ? address : '', selectedNetwork);
            // console.log('finally something ', name);
            if (name) setResolvedAddress(name.toString());
        };

        // console.log("type:", type);
        // console.log(resolveFor.includes(type ? type : ""));
        resolveAddress(text);
    });
    return <>{resolvedAddress ? resolvedAddress : text}</>;
}

export default Address;
