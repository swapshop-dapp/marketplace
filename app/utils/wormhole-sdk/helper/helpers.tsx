import { CHAIN_ID_SEI, ChainId, uint8ArrayToHex } from "@certusone/wormhole-sdk";
import { getSignedVAAWithRetry } from "../getSignedVAAWithRetry";

type AdditionalPayloadOverride = {
    receivingContract: Uint8Array;
    payload: Uint8Array;
};

export function maybeAdditionalPayload(
    recipientChain: ChainId,
    recipientAddress: Uint8Array,
    originChain?: ChainId,
): AdditionalPayloadOverride | null {
    if (recipientChain === CHAIN_ID_SEI && originChain !== CHAIN_ID_SEI) {
        return null;
        // {
        // receivingContract: SEI_TRANSLATER_TARGET,
        // payload: new Uint8Array(
        //   Buffer.from(
        //     JSON.stringify({
        //       basic_recipient: {
        //         recipient: Buffer.from(
        //           // Sei wallet addresses are 20 bytes
        //           cosmos.humanAddress("sei", recipientAddress.slice(12))
        //         ).toString("base64"),
        //       },
        //     })
        //   )
        // ),
        // };
    }
    return null;
}

export async function fetchSignedVAA(
    chainId: ChainId,
    emitterAddress: string,
    sequence: string,
) {
    const { vaaBytes, isPending } = await getSignedVAAWithRetry(
        chainId,
        emitterAddress,
        sequence
    );
    if (vaaBytes !== undefined) {
        window.localStorage.setItem('VAA', uint8ArrayToHex(vaaBytes));
        console.log('SignedVAAHex', uint8ArrayToHex(vaaBytes));
        console.log('IsVAAPending,', false);
    } else if (isPending) {
        console.log('IsVAAPending', isPending);
    } else {
        throw new Error("Error retrieving VAA info");
    }
}

export function handleError(e: Error | any) {
    console.error(e);
    console.log("IsSending", false);
    console.log("IsVAAPending", false);
}

export const logTxResult = (id: string, blockNumber: number) =>{
    console.log('===================');
    console.log({ id: id, blockNumber: blockNumber });
    console.log('===================');
}

export const sleep = async (ms: number) => {
    return new Promise((r) => {
        setTimeout(() => {r(ms)}, ms)
    })
}