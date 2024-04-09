"use client";

import {
  CHAIN_ID_SOLANA,
  CHAIN_ID_SUI,
  ChainId,
  isEVMChain
} from "@certusone/wormhole-sdk";
import {
  WalletContextState as WalletContextStateSui,
} from "@suiet/wallet-kit";
import { evm as evmRedeem, solana as solanaRedeem } from './redeemHandler';
import { evm as evmTransfer, solana as solanaTransfer, sui } from './transferHandler';

type HandleTransfer = {
    sourceChain: ChainId;
    sourceAsset?: string;
    decimals?: number;
    amount: string;
    targetChain: ChainId;
    isNative: boolean;
    // evm token address
    targetAddress?: Uint8Array;
    // solana token public key
    sourceTokenPublicKey?: string;
    // solana origin asset
    originAsset?: string;
    relayerFee?: string;
    evmSigner?: any;
    solanaSigner?: any,
    solanaPubKey?: string,

    /// sui wallet
  suiWallet: WalletContextStateSui
}

export const handleTransfer = ({
    sourceChain,
    sourceAsset,
    decimals,
    amount,
    targetChain,
    isNative,
    relayerFee,
    targetAddress,
    sourceTokenPublicKey,
    evmSigner,
    solanaSigner,
    solanaPubKey,
    originAsset,
    suiWallet,
}: HandleTransfer) => {
    if (
        isEVMChain(sourceChain) &&
        !!sourceAsset &&
        decimals !== undefined &&
        !!targetAddress
    ) {
        return evmTransfer(
            evmSigner,
            sourceAsset,
            decimals,
            amount,
            targetChain,
            targetAddress,
            isNative,
            sourceChain,
            relayerFee
        );
    } else if (
        sourceChain === CHAIN_ID_SOLANA &&
        // !!sourceAsset &&
        // !!sourceTokenPublicKey &&
        // !!targetAddress &&
        decimals !== undefined
    ) {
        return solanaTransfer(
            solanaSigner,
            solanaPubKey as string,
            sourceTokenPublicKey as string,
            sourceAsset as string,
            amount,
            decimals,
            targetChain,
            targetAddress,
            isNative,
            originAsset,
            sourceChain,
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
        } else if (
          sourceChain === CHAIN_ID_SUI &&
          suiWallet.connected &&
          suiWallet.address &&
          !!sourceAsset &&
          decimals !== undefined &&
          !!targetAddress
        ) {
          sui(
            suiWallet,
            sourceAsset,
            amount,
            decimals,
            targetChain,
            targetAddress,
            relayerFee
          );
        
    }
};


type HandleRedeem = {
    targetChain: ChainId,
    evmSigner?: any;
    solanaWallet?: any,
    solanaPubKey?: string,
    signedVAA?: Uint8Array,
};

export const handleRedeem = ({
    evmSigner,
    solanaWallet,
    solanaPubKey,
    targetChain,
    signedVAA,
}: HandleRedeem) => {
        if (isEVMChain(targetChain) && !!evmSigner && signedVAA) {
           return evmRedeem(evmSigner, signedVAA, false, targetChain);
        } else if (
            targetChain === CHAIN_ID_SOLANA &&
            !!solanaWallet &&
            !!solanaPubKey &&
            signedVAA
        ) {
            return solanaRedeem(
                solanaWallet,
                solanaPubKey,
                signedVAA,
                false
            );
        }
            // else if (isTerraChain(targetChain) && !!terraWallet && signedVAA) {
        //     terra(
        //         dispatch,
        //         enqueueSnackbar,
        //         terraWallet,
        //         signedVAA,
        //         terraFeeDenom,
        //         targetChain
        //     );
        // } else if (targetChain === CHAIN_ID_XPLA && !!xplaWallet && signedVAA) {
        //     xpla(dispatch, enqueueSnackbar, xplaWallet, signedVAA);
        // } else if (targetChain === CHAIN_ID_APTOS && !!aptosAddress && signedVAA) {
        //     aptos(dispatch, enqueueSnackbar, signedVAA, signAndSubmitTransaction);
        // } else if (
        //     targetChain === CHAIN_ID_ALGORAND &&
        //     algoAccounts[0] &&
        //     !!signedVAA
        // ) {
        //     algo(dispatch, enqueueSnackbar, algoAccounts[0]?.address, signedVAA);
        // } else if (
        //     targetChain === CHAIN_ID_INJECTIVE &&
        //     injWallet &&
        //     injAddress &&
        //     signedVAA
        // ) {
        //     injective(dispatch, enqueueSnackbar, injWallet, injAddress, signedVAA);
        // } else if (
        //     targetChain === CHAIN_ID_SEI &&
        //     seiSigningCosmWasmClient &&
        //     seiAddress &&
        //     signedVAA
        // ) {
        //     sei(
        //         dispatch,
        //         enqueueSnackbar,
        //         seiSigningCosmWasmClient,
        //         seiAddress,
        //         signedVAA
        //     );
        // } else if (
        //     targetChain === CHAIN_ID_NEAR &&
        //     nearAccountId &&
        //     wallet &&
        //     !!signedVAA
        // ) {
        //     near(dispatch, enqueueSnackbar, nearAccountId, signedVAA, wallet);
        // } else if (
        //     targetChain === CHAIN_ID_SUI &&
        //     suiWallet.address &&
        //     !!signedVAA
        // ) {
        //     sui(dispatch, enqueueSnackbar, suiWallet, signedVAA);
        // }
        //
}