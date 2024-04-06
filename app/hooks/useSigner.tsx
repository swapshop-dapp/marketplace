"use client";

import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { CHAIN_TYPE } from "../consts/chain";
import { useWalletModalContext } from "../context/walletContext";
import { useEVMClient } from "./useEVMClient";

export const useSigner = () => {
    const walletContext = useWalletModalContext();
    const { wallet, signTransaction } = useSolanaWallet();
    const { signer: evmSigner, address } = useEVMClient();

    const SIGNERS = {
        [CHAIN_TYPE.SOLANA]: {
            wallet: wallet,
            sign: signTransaction
        },
        [CHAIN_TYPE.EVM]: {
            wallet: address,
            sign: evmSigner
        },
    };

    return SIGNERS[walletContext.selectedWalletChainType];
}
