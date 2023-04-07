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

// const fallbackValue = 'ayayayaya';

export function ConfigProvider({ children }: Props) {
    const [selectedNetwork, setSelectedNetwork] = useState(NETWORK_LIST[0].key);
    const router = useRouter();

    // Get the current query parameters
    const { query } = router;

    const getNetworkState = () => {
        return localStorage.getItem('selectedNetwork') == null ? NETWORK_LIST[0].key : localStorage.getItem('selectedNetwork');
    };

    // useEffect(() => {
    //     setSelectedNetwork(getNetworkState() as string);
    // }, []);

    // useEffect(() => {
    //     if (selectedNetwork == fallbackValue) {
    //         return;
    //     }

    //     localStorage.setItem('selectedNetwork', selectedNetwork);
    //     // Update URL with new value of selectedNetwork
    //     let newQuery;
    //     console.log('network in query ', 'network' in query);
    //     if ('network' in query) {
    //         newQuery = query;
    //     }
    //     // else {
    //     //     newQuery = {
    //     //         ...query,
    //     //         network: selectedNetwork,
    //     //     };
    //     // }

    //     // console.log(router.asPath)
    //     // const href = {
    //     //     pathname: '/',    //TODO: not to redirect it back to home page
    //     //     query: newQuery,
    //     // };
    //     // router.push(href, undefined, { shallow: true });
    // }, [query]);
    // useEffect(() => {
    //     // Update URL with new value of selectedNetwork
    //     const newQuery = {
    //         ...query,
    //         network: selectedNetwork,
    //     };
    //     const href = {
    //         pathname: "/",
    //         query: newQuery,
    //     };
    //     router.push(href, undefined, { shallow: true });
    // }, [selectedNetwork]);

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
