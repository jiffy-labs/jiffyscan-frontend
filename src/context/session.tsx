// context/user.js
import { set } from 'lodash';
import { createContext, useContext, useState, useEffect } from 'react';
// Creating the user context

const SessionContext = createContext({} as SessionContextType);

export interface SessionContextType {
    user?: {
        id: number;
        name: string;
        token: string;
        profilePicture?: string;
        email: string;
        username?: string;
    };
    sessionTokens: {
        accessToken: string;
        idToken: string;
        expiresAt: number;
        refreshToken: string;
    };
    setUser: (user: SessionContextType['user']) => void;
    setSessionTokens: (session: SessionContextType['sessionTokens']) => void;
    expiryStatus: () => boolean;
}

const getUserFromLocalStorage = (): SessionContextType['user'] => {
    if (localStorage) {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : {};
    }
    return {} as SessionContextType['user'];
};

const getSessionTokensFromLocalStorage = (): SessionContextType['sessionTokens'] => {
    if (localStorage) {
        const sessionTokens = localStorage.getItem('sessionTokens');
        return sessionTokens ? JSON.parse(sessionTokens) : {};
    }
    return {} as SessionContextType['sessionTokens'];
}

// Making the function which will wrap the whole app using Context Provider
export default function SessionStore({ children }: any) {
    const [user, setUser] = useState<SessionContextType['user']>({} as SessionContextType['user']);
    const [sessionTokens, setSessionTokens] = useState<SessionContextType['sessionTokens']>({} as SessionContextType['sessionTokens']);
    
    const expiryStatus = () => {
        if (sessionTokens.accessToken && "expiresAt" in sessionTokens && sessionTokens.expiresAt > (Date.now() / 1000)) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        setUser(getUserFromLocalStorage());
        setSessionTokens(getSessionTokensFromLocalStorage());
    }, []);


    useEffect(() => {
        if (user && Object.keys(user).length != 0)
            localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        if (sessionTokens && Object.keys(sessionTokens).length != 0)
            localStorage.setItem('sessionTokens', JSON.stringify(sessionTokens));
    }, [sessionTokens]);

    return (
        <SessionContext.Provider value={{ user, sessionTokens, expiryStatus, setUser, setSessionTokens }}>
            {children}
        </SessionContext.Provider>
    );
}

// Make useSessionsContext Hook to easily use our context throughout the application
export function useSessionContext() {
    return useContext(SessionContext);
}
