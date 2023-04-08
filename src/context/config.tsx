import { fallBack, NETWORK_LIST } from '@/components/common/constants';
import { getNetworkParam } from '@/components/common/utils';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ConfigContextType = {
    selectedNetwork: string;
    setSelectedNetwork: (network: string) => void;
};

const configContextDefaultValues: ConfigContextType = {
    selectedNetwork: '',
    setSelectedNetwork: () => {},
};

const ConfigContext = createContext<ConfigContextType>(configContextDefaultValues);

export function useConfig() {
    return useContext(ConfigContext);
}

type Props = {
    children: ReactNode;
};




export function ConfigProvider({ children }: Props) {
    const router = useRouter();

    // Get the current query parameters
    const { query } = router;

    const [selectedNetwork, setSelectedNetwork] = useState('');

    useEffect(() => {
        setSelectedNetwork(getNetworkParam());
    }, [])

    useEffect(() => {
        // if (query?.network == selectedNetwork) return;
        if (!selectedNetwork) return;

        const href = {
            pathname: window.location.pathname,    
            query: {network: selectedNetwork},
        };

        console.log(JSON.stringify(href));
        localStorage.setItem('network', selectedNetwork);
        router.push(href, undefined, { shallow: true });
    }, [selectedNetwork]);
    
    const value: ConfigContextType = {
        selectedNetwork,
        setSelectedNetwork,
    };

    return (
        <>
            <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
        </>
    );
}
