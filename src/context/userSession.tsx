// context/user.js
import { set } from 'lodash';
import { createContext, useContext, useState, useEffect } from 'react';
import auth0 from 'auth0-js';
import { DefaultSession, Session } from 'next-auth/core/types';
import { useSession, signIn, signOut } from 'next-auth/react';
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
    const {data: session} = useSession();

    const isLoggedIn = () => {
        const expiryTime = session?.user?.expires_at ? session.user.expires_at : session?.user?.exp;
        console.log('expiryTime', expiryTime);
        console.log('currentTime', Date.now() / 1000);
        console.log('expiryTime > (Date.now() / 1000)', expiryTime ? expiryTime  > (Date.now() / 1000) : false);
        return expiryTime ? expiryTime > (Date.now() / 1000) : false;
    }

    const signOut = () => {
        signOut();
    }
    
    const signIn = (social: Social) => {
        signIn(social);
    };

    return (
        <UserSessionContext.Provider value={{ isLoggedIn, signIn, signOut, session }}>
            {children}
        </UserSessionContext.Provider>
    );
}

// Make useUserSession Hook to easily use our context throughout the application
export function useUserSession() {
    return useContext(UserSessionContext);
}
