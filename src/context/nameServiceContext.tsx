// context/user.js
import { createContext, useContext, useState } from 'react';
import { resolveBNSAddress } from '@/components/common/apiCalls/jiffyApis';
// Creating the user context

const NameServiceContext = createContext({} as NameService);

export interface NameService {
    getName: (address: string) => Promise<string>;
    getAddress: (name: string) => Promise<string>;
}

const resolveAddress = async (address: String | undefined | null, network: string) => {
    const name = await resolveBNSAddress(address ? address : '', network);
    return name.toString();
};

// Making the function which will wrap the whole app using Context Provider
export default function NameServiceStore({ children }: any) {
    const [nameToAddressMap, setNameToAddressMap] = useState<{ [key: string]: string }>({});
    const [addressToNameMap, setAddressToNameMap] = useState<{ [key: string]: string }>({});

    const getName = async (address: string): Promise<string> => {
        let resolvedName = address;
        if (!(address in addressToNameMap)) {
            console.log('resolved ?', addressToNameMap, address);
            const name = await resolveAddress(address, 'base');
            if (name != '') {
                setAddressToNameMap({ ...addressToNameMap, [address]: name });
                setNameToAddressMap({ ...nameToAddressMap, [name]: address });
                resolvedName = name;
            }
        } else {
            console.log('resolved ?', addressToNameMap, address);

            resolvedName = addressToNameMap[address];
        }
        return resolvedName;
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
