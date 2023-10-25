import {Provider} from "next-auth/providers";
import CredentialsProvider from 'next-auth/providers/credentials'
import authorize from "@/lib/authorize";
import jwt from "@/lib/jwtAuthCallBack";
import manageSession from "@/lib/sessionCallBack";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const COGNITO_REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;
const COGNITO_DOMAIN = process.env.COGNITO_DOMAIN;
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
const COGNITO_CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET;
const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

console.log("Process env:", process.env)


export const authOptions = {

    providers: [
        // ...["Google"].map((provider) => getProvider(provider)),
        TwitterProvider({
            clientId: TWITTER_CLIENT_ID ? TWITTER_CLIENT_ID : "",
            clientSecret: TWITTER_CLIENT_SECRET ? TWITTER_CLIENT_SECRET : "",
            version: "2.0",
          }),
        GithubProvider({
            clientId: GITHUB_CLIENT_ID ? GITHUB_CLIENT_ID : "",
            clientSecret: GITHUB_CLIENT_SECRET ? GITHUB_CLIENT_SECRET : "",
        })
        // CredentialsProvider({
        //     type: "credentials",
        //     id: 'Credentials_signIn',
        //     name: 'Credentials_signIn',
        //     credentials: {
        //         username: {label: 'Username', type: 'text'},
        //         // email: {label: 'Email', type: 'text'},
        //         password: {label: 'Password', type: 'password'},
        //     },

        //     authorize: async (credentials) => {
        //         // Use AWS SDK to authenticate against Cognito
        //         return await authorize(credentials) as User | null
        //     }
        // }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn() {
            // Return true to allow sign in and false to block sign in.
            return true;
        },
        async redirect(url: any) {
            console.log("Url======>", url)
            // Return the url to redirect to after successful sign in.
            // Allows relative callback URLs

            if (url.url.startsWith("/")) return `${url.baseUrl}${url.url}`
            // Allows callback URLs on the same origin
            else if (new URL(url.url)?.origin === url.baseUrl) return url.url
            return url.baseUrl
        },
        jwt: jwt,
        // async jwt({token, account, profile, user}: any) {
        //     return awaits jwt({token, account, profile, user})
        // },
        session: manageSession,
        // return session; // Make sure to return the modified session
    },
    pages: {
        signIn: '/'
      }
};


