import { init, useQuery, fetchQuery } from "@airstack/airstack-react";

init(process.env.AIRSTACK_API_KEY!);

const tokenList = [
    {
        name: "DEGEN",
        contract: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed"
        },
    {
        name: "WETH",
        contract: "0x4200000000000000000000000000000000000006"
    },
    {
        name: "USDC",
        contract: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    },
    {
        name: "BOOMER",
        contract: "0xcdE172dc5ffC46D228838446c57C1227e0B82049"
    }
];

const fetchTokenBalancesQuery = "query MyQuery($ownerList: [Identity!], $tokenAddressList: [Address!]) {\n" +
    "  TokenBalances(\n" +
    "    input: {filter: {owner: {_in: $ownerList}, tokenAddress: {_in: $tokenAddressList}}, blockchain: base}\n" +
    "  ) {\n" +
    "    TokenBalance {\n" +
    "      amount\n" +
    "      tokenAddress\n" +
    "      token {\n" +
    "        name\n" +
    "        decimals\n" +
    "      }\n" +
    "    }\n" +
    "  }\n" +
    "}"

export async function fetchTokenBalances(fid: string){
    const {data, error} = await fetchQuery(fetchTokenBalancesQuery,
    {
        tokenAddressList: tokenList.map((token) => {return token.contract}),
        ownerList: [`fc_fid:${fid}`]
    }
    , );
    if(error){
        console.error(error);
    }
    return data;
}

