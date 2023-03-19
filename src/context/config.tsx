import { NETWORK_LIST } from "@/components/common/constants";
import { createContext, ReactNode, useContext, useState } from "react";


type ConfigContextType = {
    selectedNetwork: string;
    setSelectedNetwork: (network: string) => void;
};

const configContextDefaultValues: ConfigContextType = {
    selectedNetwork: "mainnet",
    setSelectedNetwork: () => {},
}

const ConfigContext = createContext<ConfigContextType>(configContextDefaultValues);

export function useConfig() {
    return useContext(ConfigContext);
}

type Props = {
    children: ReactNode;
};

export function ConfigProvider({ children }: Props) {
    const [selectedNetwork, setSelectedNetwork] = useState(NETWORK_LIST[0].key);
    
    const value: ConfigContextType = {
        selectedNetwork,
        setSelectedNetwork,
    };

    return (
        <>
            <ConfigContext.Provider value={value}>
                {children}
            </ConfigContext.Provider>
        </>
    );
}
