"use client";

import {
    CHAIN_ID_SOLANA,
    CHAIN_ID_TO_NAME,
    ChainId,
    isEVMChain,
} from "@certusone/wormhole-sdk";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
import { Signer, ethers } from "ethers";
import { EVM_RPC } from "./consts";
import { evm, solana } from './handler';

type HandleTransfer = {
    sourceChain: ChainId;
    sourceAsset: string;
    decimals: number;
    amount: string;
    targetChain: ChainId;
    originChain: ChainId;
    isNative: boolean;
    // evm token address
    targetAddress?: Uint8Array;
    // solana token public key
    sourceTokenPublicKey?: string;
    // solana origin asset
    originAsset?: string;
    relayerFee?: string;
}

const handleTransfer = ({
    sourceChain,
    sourceAsset,
    decimals,
    amount,
    targetChain,
    originChain,
    isNative,
    relayerFee,
    targetAddress,
    sourceTokenPublicKey,
    originAsset
}: HandleTransfer) => {
    if (
        isEVMChain(sourceChain) &&
        !!sourceAsset &&
        decimals !== undefined &&
        !!targetAddress
    ) {
        const chainName = CHAIN_ID_TO_NAME[sourceChain];
        const signer: Signer = new ethers.Wallet(
            process.env[`${chainName.toUpperCase()}_PRIVATE_KEY`] as string,
            new ethers.providers.JsonRpcProvider(EVM_RPC[sourceChain])
        );
        evm(
            signer,
            sourceAsset,
            decimals,
            amount,
            targetChain,
            targetAddress,
            isNative,
            sourceChain,
            originChain,
            relayerFee
        );
    } else if (
        sourceChain === CHAIN_ID_SOLANA &&
        !!sourceAsset &&
        !!sourceTokenPublicKey &&
        !!targetAddress &&
        decimals !== undefined
    ) {
        const wallet = Keypair.fromSecretKey(Uint8Array.from(
            bs58.decode(process.env.SOLANA_PRIVATE_KEY as string)
        ));

        solana(
            wallet,
            wallet.publicKey.toString(),
            sourceTokenPublicKey,
            sourceAsset,
            amount,
            decimals,
            targetChain,
            targetAddress,
            isNative,
            originAsset,
            originChain,
            relayerFee
        );
        // } else if (
        //   isTerraChain(sourceChain) &&
        //   !!terraWallet &&
        //   !!sourceAsset &&
        //   decimals !== undefined &&
        //   !!targetAddress
        // ) {
        //   terra(
        //     dispatch,
        //     enqueueSnackbar,
        //     terraWallet,
        //     sourceAsset,
        //     amount,
        //     decimals,
        //     targetChain,
        //     targetAddress,
        //     terraFeeDenom,
        //     sourceChain,
        //     originChain,
        //     relayerFee
        //   );
        // } else if (
        //   sourceChain === CHAIN_ID_XPLA &&
        //   !!xplaWallet &&
        //   !!sourceAsset &&
        //   decimals !== undefined &&
        //   !!targetAddress
        // ) {
        //   xpla(
        //     dispatch,
        //     enqueueSnackbar,
        //     xplaWallet,
        //     sourceAsset,
        //     amount,
        //     decimals,
        //     targetChain,
        //     targetAddress,
        //     originChain,
        //     relayerFee
        //   );
        // } else if (
        //   sourceChain === CHAIN_ID_ALGORAND &&
        //   algoAccounts[0] &&
        //   !!sourceAsset &&
        //   decimals !== undefined &&
        //   !!targetAddress
        // ) {
        //   algo(
        //     dispatch,
        //     enqueueSnackbar,
        //     algoAccounts[0].address,
        //     sourceAsset,
        //     decimals,
        //     amount,
        //     targetChain,
        //     targetAddress,
        //     sourceChain,
        //     originChain,
        //     relayerFee
        //   );
        // } else if (
        //   sourceChain === CHAIN_ID_APTOS &&
        //   aptosAddress &&
        //   !!sourceAsset &&
        //   decimals !== undefined &&
        //   !!targetAddress
        // ) {
        //   aptos(
        //     dispatch,
        //     enqueueSnackbar,
        //     sourceAsset,
        //     decimals,
        //     amount,
        //     targetChain,
        //     targetAddress,
        //     sourceChain,
        //     signAndSubmitTransaction,
        //     originChain,
        //     relayerFee
        //   );
        // } else if (
        //   sourceChain === CHAIN_ID_INJECTIVE &&
        //   injWallet &&
        //   injAddress &&
        //   !!sourceAsset &&
        //   decimals !== undefined &&
        //   !!targetAddress
        // ) {
        //   injective(
        //     dispatch,
        //     enqueueSnackbar,
        //     injWallet,
        //     injAddress,
        //     sourceAsset,
        //     amount,
        //     decimals,
        //     targetChain,
        //     targetAddress,
        //     originChain,
        //     relayerFee
        //   );
        // } else if (
        //   sourceChain === CHAIN_ID_SEI &&
        //   seiSigningCosmWasmClient &&
        //   seiAddress &&
        //   !!sourceAsset &&
        //   decimals !== undefined &&
        //   !!targetAddress
        // ) {
        //   sei(
        //     dispatch,
        //     enqueueSnackbar,
        //     seiSigningCosmWasmClient,
        //     seiAddress,
        //     sourceAsset,
        //     amount,
        //     decimals,
        //     targetChain,
        //     targetAddress,
        //     relayerFee
        //   );
        // } else if (
        //   sourceChain === CHAIN_ID_NEAR &&
        //   nearAccountId &&
        //   nearWallet &&
        //   !!sourceAsset &&
        //   decimals !== undefined &&
        //   !!targetAddress
        // ) {
        //   near(
        //     dispatch,
        //     enqueueSnackbar,
        //     nearWallet,
        //     nearAccountId,
        //     sourceAsset,
        //     decimals,
        //     amount,
        //     targetChain,
        //     targetAddress,
        //     sourceChain,
        //     originChain,
        //     relayerFee
        //   );
        // } else if (
        //   sourceChain === CHAIN_ID_SUI &&
        //   suiWallet.connected &&
        //   suiWallet.address &&
        //   !!sourceAsset &&
        //   decimals !== undefined &&
        //   !!targetAddress
        // ) {
        //   sui(
        //     dispatch,
        //     enqueueSnackbar,
        //     suiWallet,
        //     sourceAsset,
        //     amount,
        //     decimals,
        //     targetChain,
        //     targetAddress,
        //     originChain,
        //     relayerFee
        //   );
    }
};

// handleTransfer({
//   sourceChain: CHAIN_ID_SOLANA,
// })