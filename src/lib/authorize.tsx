import {CognitoIdentityProvider} from "@aws-sdk/client-cognito-identity-provider";

const COGNITO_REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;
const LOGIN_REGISTER_COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_LOGIN_REGISTER_COGNITO_CLIENT_ID;
const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
export default async function authorize(credentials: any) {
    const cognito = new CognitoIdentityProvider({region: COGNITO_REGION});
    const signInParams = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: LOGIN_REGISTER_COGNITO_CLIENT_ID,
        UserPoolId: COGNITO_USER_POOL_ID,
        AuthParameters: {
            USERNAME: credentials.email,
            PASSWORD: credentials.password,
        },
    };
    console.log("signInParams", signInParams)
    // return;
    try {
        const signInResponse = await cognito.initiateAuth(signInParams);
        console.log("signInResponse:", signInResponse);
        // Process signInResponse and return a user object if successful
        if (signInResponse.AuthenticationResult) {
            return {
                accessToken: signInResponse.AuthenticationResult.AccessToken,
                idToken: signInResponse.AuthenticationResult.IdToken,
                refreshToken: signInResponse.AuthenticationResult.RefreshToken,
                user: {
                    email: credentials.email,
                }
            }
        } else {
            console.log('Error signing in:', signInResponse, signInParams);
            throw new Error('Failed to authenticate')
        }
    } catch (error: any) {
        console.log('Error : ddd', error);
        throw new Error(error.message)
    }
}