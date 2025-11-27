'use client';

import React, { useEffect, useState } from 'react';
import { useConfig } from '@/context/config';
import { useNameService } from '@/context/nameServiceContext';

function Address({ text }: any) {
    const { getName } = useNameService();
    const [resolvedName, setResolvedName] = useState('');

    useEffect(() => {
        const resolveAddress = async () => {
            const name = await getName(text);
            setResolvedName(name);
        };
        resolveAddress();
    }, [text]);

    return <>{resolvedName ? resolvedName : text}</>;
}

export default Address;
