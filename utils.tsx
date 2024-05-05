import { init, useQuery, fetchQuery } from "@airstack/airstack-react";
import BigNumber from "bignumber.js";

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

const createQuery = ({fid, tokenAddresses}: {fid: number, tokenAddresses: string[]}) => {
    return `query MyQuery {
  TokenBalances(
    input: {
      filter: {
        owner: { _in: ["fc_fid:${fid}"] },
        tokenAddress: {
          _in:${JSON.stringify(tokenAddresses)}
        }
      },
      blockchain: base
    }
  ) {
    TokenBalance {
      amount
      tokenAddress
      token {
        name
        decimals
      }
    }
  }
}
`
}

export async function fetchTokenBalances(fid: number){
    init(process.env.AIRSTACK_API_KEY);
    const tokenAddresses = tokenList.map((token) => {return token.contract});
    const query = createQuery({fid, tokenAddresses})
    // console.log(query);
    const {data, error} = await fetchQuery(query);
    if(error){
        console.error(error);
    }
    return data?.TokenBalances?.TokenBalance?.map((balance) => {
        return {
            name: balance.token.name,
            amount: BigNumber(balance.amount).div(BigNumber(10).exponentiatedBy(balance.token.decimals)).toString()
        }
    });
    // return data?.TokenBalances;
}

export function getBalancesImage(balances: { name: string; amount: string }[]) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {balances.map((balance, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontWeight: 'bold', marginRight: 5 }}>{balance.name}</span>: {balance.amount}
                </div>
            ))}
        </div>
);
}
