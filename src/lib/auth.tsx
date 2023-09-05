import {Provider} from "next-auth/providers";
import CredentialsProvider from 'next-auth/providers/credentials'
import authorize from "@/lib/authorize";
import jwt from "@/lib/jwtAuthCallBack";
import manageSession from "@/lib/sessionCallBack";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const COGNITO_REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;
const COGNITO_DOMAIN = process.env.COGNITO_DOMAIN;
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
const COGNITO_CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET;
console.log("Process env:", process.env)
type User = {
    id: string;
    accessToken: string | undefined;
    idToken: string | undefined;
    refreshToken: string | undefined;
    user: {
        email: string;
        // Other properties
    };
};

function getProvider(provider: string): Provider {
    return {
        id: `cognito_${provider.toLowerCase()}`,
        name: `Cognito${provider}`,
        type: "oauth",
        checks: 'nonce',
        clientId: COGNITO_CLIENT_ID,
        clientSecret: COGNITO_CLIENT_SECRET,
        wellKnown: `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/openid-configuration`,
        authorization: {
            url: `${COGNITO_DOMAIN}/oauth2/authorize`,
            params: {
                response_type: "code",
                client_id: COGNITO_CLIENT_ID,
                identity_provider: provider,
                redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/cognito_${provider.toLowerCase()}`
            }
        },
        idToken: true,
        // Token endpoint configuration
        token: {
            url: `${COGNITO_DOMAIN}/oauth2/token`,
            params: {
                grant_type: "authorization_code",
                client_id: COGNITO_CLIENT_ID,
                client_secret: COGNITO_CLIENT_SECRET,
                redirect_uri: `${NEXTAUTH_URL}/api/auth/callback/cognito_${provider.toLowerCase()}`
            }
        },
        // userInfo endpoint configuration
        userinfo: {
            url: `${COGNITO_DOMAIN}/oauth2/userInfo`,
        },
        // Profile to return after successful auth.
        // You can do some transformation on your profile object here.
        profile: function (profile) {
            console.log("Profile:", profile)
            return {
                id: profile.sub,
                ...profile
            }
        }
    }
}

export const authOptions = {
    providers: [
        ...["Google"].map((provider) => getProvider(provider)),
        CredentialsProvider({
            type: "credentials",
            id: 'Credentials_signIn',
            name: 'Credentials_signIn',
            credentials: {
                username: {label: 'Username', type: 'text'},
                // email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },

            authorize: async (credentials) => {
                // Use AWS SDK to authenticate against Cognito
                return await authorize(credentials) as User | null
            }
        }),
    ],
    callbacks: {
        async signIn() {
            // Return true to allow sign in and false to block sign in.
            return true;
        },
        async redirect({baseUrl}: any) {
            // Return the url to redirect to after successful sign in.
            return baseUrl;
        },
        jwt: jwt,
        // async jwt({token, account, profile, user}: any) {
        //     return await jwt({token, account, profile, user})
        // },
        session: manageSession,
        // return session; // Make sure to return the modified session
    }
};


