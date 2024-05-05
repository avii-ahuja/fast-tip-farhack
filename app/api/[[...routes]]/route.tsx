/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import abi  from '../../../abi'
import {base} from "viem/chains";
import { encodeFunctionData, formatEther, parseEther } from 'viem';
import { serveStatic } from 'frog/serve-static'
import {neynar} from "frog/middlewares";
import {fetchTokenBalances, getOwnerAddress, renderBalances} from "@/utils";

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
})

const neynarMiddleware = neynar({
    apiKey: '',
    features: ['interactor', 'cast']
})

app.frame('/', (c: any) => {
    // const { frameData, verified } = c
    // console.log({frameData, verified});
    return c.res({
        image: (
            <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
                Tip this cast
            </div>
        ),
        intents: [
            <Button value={"wallet"} action={'/wallet'}>Tip from Wallet</Button>,
            <Button value={"stats"}>Tip stats</Button>
        ]
    })
})

app.frame('/wallet', async (c) => {
    const { frameData } = c

    const {fid} = frameData;
    // const owner = await getOwnerAddress(fid);
    //TODO: change owner
    const owner = "0x71dFBcf277b52c02C67Dc7f701C6D6Cb040A809C";
    const tokens = await fetchTokenBalances(owner as any);
    console.log({tokens});
    const imageHTML = renderBalances(tokens);
    const buttons = tokens?.balances.map((token) => <Button.Transaction value={"stats"} target={`/transfer/${token.tokenAddress}`}>Tip {token.name} ({token.amount.decimalPlaces(3).toString()})</Button.Transaction>);
    return c.res({
        action: '/finish',
        image: imageHTML,
        intents: [<TextInput placeholder="Enter amount to tip" />, ...buttons]
    })
})

app.frame('/finish', (c) => {
    const { transactionId } = c
    return c.res({
        image: (
            <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
                Transaction ID: {transactionId}
            </div>
        )
    })
})

app.transaction('/transfer/:tokenAddress', (c: any) => {
    const { inputText } = c
    const {tokenAddress} = c.req.param();
    console.log({inputText, tokenAddress})

    //TODO: set receiver
    let receiver = "0xA511e2b5298e27F6380cB044327005b82a4444C3"
    // Send transaction response.
    const data = encodeFunctionData({
        abi,
        functionName: 'transfer',
        args: [receiver, parseEther(inputText)],
    })

    return c.send({
        abi,
        chainId: `eip155:${base.id}`,
        to: tokenAddress,
        value: parseEther("0"),
        data
    })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)