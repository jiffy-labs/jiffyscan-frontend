import {DefaultSession, Session} from "next-auth";
import {JWT} from "next-auth/jwt";

export default async function manageSession(params: {
    session: Session;
    token: JWT;
    user: any; // Replace with the appropriate user type
    newSession: any; // Replace with the appropriate session type
    trigger: "update";
}): Promise<Session | DefaultSession> {
    // Your session handling logic here
    params.session.user = {
        ...params.session.user, // Use just session.user
        ...params.token, // Merge properties from token into user
    };
    return params.session// Make sure to return the modified session
};