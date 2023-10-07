import NextAuth from 'next-auth'
import {authOptions} from "@/lib/auth";
export default NextAuth(authOptions)
// export { handler as GET, handler as POST }