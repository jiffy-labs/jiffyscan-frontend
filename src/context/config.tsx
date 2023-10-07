import { AddressMapping, getAddressMapping } from '@/components/common/apiCalls/jiffyApis';
import { fallBack, NETWORK_LIST } from '@/components/common/constants';
import { getNetworkParam } from '@/components/common/utils';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ConfigContextType = {
    selectedNetwork: string;
    setSelectedNetwork: (network: string) => void;
    addressMapping?: AddressMapping;
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
    const [addressMapping, setAddressMapping] = useState({} as AddressMapping);

    const setAddressMaps = async () => {
        const addressMappings = await getAddressMapping();
        setAddressMapping(addressMappings);
    };

    useEffect(() => {
        setSelectedNetwork(getNetworkParam());
        setAddressMaps();
    }, []);

    useEffect(() => {
        // if (query?.network == selectedNetwork) return;
        if (!selectedNetwork) return;

        const params = new URLSearchParams(window.location.search);
        const queries: {[key: string]: string}  = {}

        params.forEach((value, key) => {
            queries[key] = value;
        });
        queries['network'] = selectedNetwork;

        const href: { pathname: string; query: { [key: string]: string } } = {
            pathname: window.location.pathname,
            query: queries,
        };

        localStorage.setItem('network', selectedNetwork);
        if (
            window.location.href !=
            window.location.origin +
                window.location.pathname +
                '?' +
                Object.keys(href.query)
                    .map((key) => key + '=' + href.query[key])
                    .join('&')
        ) {
            router.push(href, undefined, { shallow: true });
        }
    }, [selectedNetwork]);

    const value: ConfigContextType = {
        selectedNetwork,
        setSelectedNetwork,
        addressMapping,
    };

    return (
        <>
            <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
        </>
    );
}
