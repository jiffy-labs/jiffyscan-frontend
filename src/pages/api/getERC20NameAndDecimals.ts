// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {ethers} = require('ethers');
const ERC_20_ABI = require('./ABIs/erc20.json');
const provider = ethers.getDefaultProvider('mainnet');

export default async function handler(req: any, res: any) {
    const { address } = req.query;
    let nameAndDecimal: {name: string, decimals: number}
    try {
        nameAndDecimal = await getERC20NameAndDecimals(address);
    } catch(e) {
        console.log(e);
        res.status(200).json({ name: "", decimals: 18 })
        return;
    }
    res.status(200).json(nameAndDecimal);
}

async function getERC20NameAndDecimals(address: string): Promise<{name: string, decimals: number}> 
{
    let contract = new ethers.Contract(address, ERC_20_ABI, provider);
    let name: string = await contract.name();
    let decimals: number = await contract.decimals();
    return {name, decimals};
}