// /** @jsxImportSource frog/jsx */
//
// import { Button, Frog, TextInput } from 'frog'
// import { devtools } from 'frog/dev'
// // import { neynar } from 'frog/hubs'
// import { handle } from 'frog/next'
// import { serveStatic } from 'frog/serve-static'
//
//
// export const app = new Frog({
//   assetsPath: '/',
//   basePath: '/api',
//   // Supply a Hub to enable frame verification.
//   // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
// })
//
// // Uncomment to use Edge Runtime
// // export const runtime = 'edge'
//
// app.frame('/', (c) => {
//   const { buttonValue, inputText, status } = c
//   const fruit = inputText || buttonValue
//   return c.res({
//     image: (
//       <div
//         style={{
//           alignItems: 'center',
//           background:
//             status === 'response'
//               ? 'linear-gradient(to right, #432889, #17101F)'
//               : 'black',
//           backgroundSize: '100% 100%',
//           display: 'flex',
//           flexDirection: 'column',
//           flexWrap: 'nowrap',
//           height: '100%',
//           justifyContent: 'center',
//           textAlign: 'center',
//           width: '100%',
//         }}
//       >
//         <div
//           style={{
//             color: 'white',
//             fontSize: 60,
//             fontStyle: 'normal',
//             letterSpacing: '-0.025em',
//             lineHeight: 1.4,
//             marginTop: 30,
//             padding: '0 120px',
//             whiteSpace: 'pre-wrap',
//           }}
//         >
//           {status === 'response'
//             ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
//             : 'Welcome!'}
//         </div>
//       </div>
//     ),
//     intents: [
//       <TextInput placeholder="Enter custom fruit..." />,
//       <Button value="apples">Apples</Button>,
//       <Button value="oranges">Oranges</Button>,
//       <Button value="bananas">Bananas</Button>,
//       status === 'response' && <Button.Reset>Reset</Button.Reset>,
//     ],
//   })
// })
//
// devtools(app, { serveStatic })
//
// export const GET = handle(app)
// export const POST = handle(app)
//
/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import abi  from './abi'
import {baseSepolia} from "viem/chains";
import { encodeFunctionData, formatEther, parseEther } from 'viem';
import { serveStatic } from 'frog/serve-static'
import {neynar} from "frog/hubs";
// import { init, useQuery } from "@airstack/airstack-react";

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// app.frame('/', (c: any) => {
//     // const { frameData, verified } = c
//     // console.log({frameData, verified});
//     return c.res({
//         action: '/submit',
//         image: (
//             <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
//                 Tip this cast
//             </div>
//         ),
//         intents: [
//             <Button value={"wallet"}>Tip from Wallet</Button>,
//             <Button value={"stats"}>Tip stats</Button>
//         ]
//     })
// })
//
// app.frame('/submit', (c) => {
//     const { buttonValue } = c
//     return c.res({
//         image: (
//             <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
//                 Selected: {buttonValue}
//             </div>
//         )
//     })
// })

app.frame('/', (c) => {
        return c.res({
            image: (
                <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
                    Select your favorite fruit:
                </div>
            ),
            intents: [
                <Button value="apple">Apple</Button>,
                <Button value="banana">Banana</Button>,
                <Button value="mango">Mango</Button>
            ]
        })
    })

// Frame to display user's response.
app.frame('/submit', (c) => {
    const { buttonValue } = c
    return c.res({
        image: (
            <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
                Selected: {buttonValue}
            </div>
        )
    })
})

// app.frame('/finish', (c) => {
//     const { transactionId } = c
//     return c.res({
//         image: (
//             <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
//                 Transaction ID: {transactionId}
//             </div>
//         )
//     })
// })
//
// app.transaction('/transfer', (c: any) => {
//     const { inputText } = c
//     console.log({inputText})
//     // Send transaction response.
//     const data = encodeFunctionData({
//         abi,
//         functionName: 'transfer',
//         args: ["0xA511e2b5298e27F6380cB044327005b82a4444C3", parseEther(inputText)],
//     })
//
//     return c.send({
//         abi,
//         chainId: `eip155:${baseSepolia.id}`,
//         to: '0x4200000000000000000000000000000000000006',
//         value: parseEther("0"),
//         data
//     })
// })

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)