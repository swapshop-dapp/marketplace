"use client";

import {
    CHAIN_ID_KLAYTN,
    ChainId,
    postVaaSolanaWithRetry,
    redeemAndUnwrapOnSolana,
    redeemOnEth,
    redeemOnEthNative,
    redeemOnSolana
} from '@certusone/wormhole-sdk';
import { Signer }  from 'ethers';
import {
    getTokenBridgeAddressForChain,
    MAX_VAA_UPLOAD_RETRIES_SOLANA,
    SOL_BRIDGE_ADDRESS,
    SOL_TOKEN_BRIDGE_ADDRESS,
    SOLANA_HOST
} from '@app/utils/wormhole-sdk/consts';
import { logTxResult, handleError } from '@app/utils/wormhole-sdk/helper/helpers';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { signSendAndConfirm } from '@app/utils/wormhole-sdk/helper/solana';

export async function evm(
    signer: Signer,
    signedVAA: Uint8Array,
    isNative: boolean,
    chainId: ChainId
) {
    console.log('is redeeming');
    try {
        // Klaytn requires specifying gasPrice
        const overrides =
                  chainId === CHAIN_ID_KLAYTN
                      ? { gasPrice: (await signer.getGasPrice()).toString() }
                      : {};
        const receipt = isNative
            ? await redeemOnEthNative(
                getTokenBridgeAddressForChain(chainId),
                signer,
                signedVAA,
                overrides
            )
            : await redeemOnEth(
                getTokenBridgeAddressForChain(chainId),
                signer,
                signedVAA,
                overrides
            );
        
        logTxResult(receipt.transactionHash, receipt.blockNumber);
    } catch (e) {
        handleError(e);
    }
}

export async function solana(
    wallet: WalletContextState,
    payerAddress: string, //TODO: we may not need this since we have wallet
    signedVAA: Uint8Array,
    isNative: boolean
) {
    console.log('redeeming ...');
    try {
        if (!wallet.signTransaction) {
            throw new Error("wallet.signTransaction is undefined");
        }
        const connection = new Connection(SOLANA_HOST, "confirmed");
        await postVaaSolanaWithRetry(
            connection,
            wallet.signTransaction,
            SOL_BRIDGE_ADDRESS,
            payerAddress,
            Buffer.from(signedVAA),
            MAX_VAA_UPLOAD_RETRIES_SOLANA
        );
        // TODO: how do we retry in between these steps
        const transaction = isNative
            ? await redeemAndUnwrapOnSolana(
                connection,
                SOL_BRIDGE_ADDRESS,
                SOL_TOKEN_BRIDGE_ADDRESS,
                payerAddress,
                signedVAA
            )
            : await redeemOnSolana(
                connection,
                SOL_BRIDGE_ADDRESS,
                SOL_TOKEN_BRIDGE_ADDRESS,
                payerAddress,
                signedVAA
            );
        const txid = await signSendAndConfirm(wallet, connection, transaction);
        // TODO: didn't want to make an info call we didn't need, can we get the block without it by modifying the above call?
        logTxResult(txid, 1)
    } catch (e) {
        handleError(e);
    }
}
