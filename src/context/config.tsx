import { NETWORK_LIST } from '@/components/common/constants';
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
