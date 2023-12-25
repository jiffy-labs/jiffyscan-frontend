// context/user.js
import { createContext, useContext, useState, useEffect } from 'react';
import { DefaultSession, Session } from 'next-auth/core/types';
import * as NextAuth from 'next-auth/react';
import { useRouter } from 'next/router';
// Creating the user context

const UserSessionContext = createContext({} as UserSession);

export interface UserSession {
    session?: Session | null;
    signOut: () => void;
    signIn: (social: Social) => void;
    isLoggedIn: () => boolean;
}

export enum Social {
    TWITTER = 'twitter',
    GITHUB = 'github',
}

// Making the function which will wrap the whole app using Context Provider
export default function UserSessionStore({ children }: any) {
    const { data: session } = NextAuth.useSession();
    const [bypass, setBypass] = useState(false);
    const [initiate, setInitiate] = useState(false);

    const router = useRouter();
    const refreshPage = () => {
        router.reload();
    };

    useEffect(() => {
        if (localStorage) {
            // setBypass(localStorage.getItem('bypass') == 'true');
            setInitiate(true);
        }
    }, []);

    // useEffect(() => {
    //     if (localStorage && initiate) {
    //         // console.log('bypass', bypass)
    //         // localStorage.setItem('bypass', bypass.toString());
    //     }
    // }, [bypass, initiate]);

    const isLoggedIn = () => {
        // if (bypass) return true;
        const expiryTime = session?.user?.expires_at ? session.user.expires_at : session?.user?.exp;
        return expiryTime ? expiryTime > Date.now() / 1000 : false;
    };

    const signOut = () => {
        // if (bypass) {
        //     setBypass(false);
        //     return;
        // }
        NextAuth.signOut();
    };

    const signIn = (social: Social) => {
        // if (social == Social.TWITTER) {
        //     setBypass(true);
        //     return;
        // }
        NextAuth.signIn(social);
    };

    return <UserSessionContext.Provider value={{ isLoggedIn, signIn, signOut, session }}>{children}</UserSessionContext.Provider>;
}

// Make useUserSession Hook to easily use our context throughout the application
export function useUserSession() {
    return useContext(UserSessionContext);
}
