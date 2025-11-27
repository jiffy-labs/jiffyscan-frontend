// context/user.js
import { createContext, useContext, useState } from 'react';
// Creating the user context

const NameServiceContext = createContext({} as NameService);

export interface NameService {
    getName: (address: string) => Promise<string>;
    getAddress: (name: string) => Promise<string>;
}

// BaseNameService has shut down, so name resolution is disabled
// This function now returns empty string immediately
const resolveAddress = async (address: String | undefined | null, network: string) => {
    return '';
};

// Making the function which will wrap the whole app using Context Provider
export default function NameServiceStore({ children }: any) {
    const [nameToAddressMap, setNameToAddressMap] = useState<{ [key: string]: string }>({});
    const [addressToNameMap, setAddressToNameMap] = useState<{ [key: string]: string }>({});

    const getName = async (address: string): Promise<string> => {
        // BaseNameService has shut down, return empty string
        // Components will fall back to displaying the address
        return '';
    };

    const getAddress = async (name: string): Promise<string> => {
        // Not implemented yet
        if (name in nameToAddressMap) return nameToAddressMap[name];
        return '';
    };

    return <NameServiceContext.Provider value={{ getName, getAddress }}>{children}</NameServiceContext.Provider>;
}

// Make useUserSession Hook to easily use our context throughout the application
export function useNameService() {
    return useContext(NameServiceContext);
}
