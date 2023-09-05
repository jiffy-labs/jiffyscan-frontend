export default async function jwt({token, account, user,}: any) {
    return {...token, ...user, ...account};
}
