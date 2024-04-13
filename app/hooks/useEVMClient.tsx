"use client";

import { ethers } from 'ethers';
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
    const { isConnected, address, } = useAccount();
    const client = typeof window !== "undefined" && typeof window.ethereum !== 'undefined' ?
      new ethers.providers.Web3Provider(window.ethereum) : null;
    const signer = client?.getSigner();

    const signMessage = async (msg: string): Promise<string | undefined> => {
        if (!isConnected) return;
    
        return await window.ethereum.request({
            method: "personal_sign",
            params: [msg, address],
        });
    }

    return {
        disconnect,
        isConnected,
        address,
        signer: signer,
        client: client,
        signMessage,
    }
}