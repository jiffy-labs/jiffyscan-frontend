// context/user.js
import { set } from 'lodash';
import { createContext, useContext, useState, useEffect } from 'react';
import auth0 from 'auth0-js';
// Creating the user context

const SessionContext = createContext({} as SessionContextType);

let webAuth = new auth0.WebAuth({
    domain: 'https://dev-xbhwhdj3wrltd7bv.us.auth0.com',
    clientID: 'VRNrC8mxH3DP7v16nT41siK7zIqS8Whl',
});
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
    logout: (callbackPath: string) => void;
    login: (social: string, callbackPath: string) => void;
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

    const logout = async (callbackPath: string) => {
        let callbackUrl = (window?.location ? window.location.protocol +'//'+ window.location.host : 'http://localhost:3000') + '/callbackPopup?callbackPath='+callbackPath;

        webAuth.logout({
            returnTo: "https://localhost:3000",
            // returnTo: ('http://localhost:3000') + '/callbackPopup?callbackPath='+callbackPath,
            clientID: 'VRNrC8mxH3DP7v16nT41siK7zIqS8Whl'
          });
        setSessionTokens({accessToken: "", idToken: "", expiresAt: 0, refreshToken: ""});
        setUser({id: 0, name: "", profilePicture: "", email: "", username: "", token: ""});
    }
    
    const login = async (social: string, callbackPath: string) => {
        console.log(window.location);
        console.log('callbackurl - ', (window?.location ? window.location.protocol +'//'+ window.location.host : 'http://localhost:3000') + '/callbackPopup?callbackPath='+callbackPath);
        console.log('callbackurl - ', 'http://localhost:3000/callbackPopup?callbackPath='+callbackPath);
        let callbackUrl = (window?.location ? window.location.protocol +'//'+ window.location.host : 'http://localhost:3000') + '/callbackPopup?callbackPath='+callbackPath;
        webAuth.popup.authorize({
            domain: 'https://dev-xbhwhdj3wrltd7bv.us.auth0.com',
            responseType: 'token',
            clientId: 'VRNrC8mxH3DP7v16nT41siK7zIqS8Whl',
            redirectUri: callbackUrl,
            // redirectUri: 'http://localhost:3000/callbackPopup?callbackPath='+callbackPath,
            connection: social
          }, function(err, authResult) {
            console.log('authResult ',authResult);
            console.log('err',err);
            if (authResult?.accessToken) {
                webAuth.client.userInfo(authResult.accessToken, async function(err, user) {
                    // Now you have the user's information
                    setUser({
                        id: 1,
                        name: user.name,
                        profilePicture: user.picture,
                        email: user.email ? user.email : "",
                        username: user.nickname,
                        token: 'test'
                    });
                    console.log('here', user);
    
                    });
    
                    setSessionTokens({
                        accessToken: authResult.accessToken,
                        idToken: authResult.idToken ? authResult.idToken : "",
                        expiresAt: authResult.expiresIn ? (new Date()).getTime()/1000 + authResult.expiresIn  : 0,
                        refreshToken: authResult.refreshToken ? authResult.refreshToken : ""
                    });
                    
                  } else if (err) {
                    console.log(err);
                  }
            
          });
    };

    return (
        <SessionContext.Provider value={{ user, sessionTokens, expiryStatus, setUser, setSessionTokens, logout, login }}>
            {children}
        </SessionContext.Provider>
    );
}

// Make useSessionsContext Hook to easily use our context throughout the application
export function useSessionContext() {
    return useContext(SessionContext);
}
