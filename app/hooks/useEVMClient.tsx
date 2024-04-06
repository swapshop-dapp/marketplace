"use client";

import { createWalletClient, custom } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { useAccount, useDisconnect } from "wagmi";
import { META_MASK_ERROR_NAMES } from "../consts/metamaskError";

const handleError = (errorName = '') => {
  if (errorName !== META_MASK_ERROR_NAMES.connectorNotFoundError) {
    // setLoading(false);
    // showMetaMaskError({ errorName });
  } else {
    window?.location?.reload();
  }
};

export const useEVMClient = () => {
    const { disconnect } = useDisconnect({
        onError(data) {
        handleError(data.name);
        },
    });
    const client = createWalletClient({
        chain: polygonMumbai,
        transport: custom(window.ethereum)
    }) 
    const { isConnected, address } = useAccount();


    return {
        disconnect,
        isConnected,
        address,
        signer: client
    }
}