import NextAuth from 'next-auth'
import {authOptions} from "@/lib/auth";
import {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOptions)
}
// export { handler as GET, handler as POST }