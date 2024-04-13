"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CHAIN_TYPE, ChainTypeValue } from "../consts/chain";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useEVMClient } from "../hooks/useEVMClient";
import { TODO } from "../consts/type";
import base58 from "bs58";

type CONNECT_WALLET_STEP = "CHOOSE_A_NETWORK" | "CONNECT_TO_WALLET";
type WalletMetadata = {
    isConnected: boolean,
    address: string,
    disconnect: () => void,
    icon: TODO,
    signMsg: () => Promise<string | undefined>,
};

type DefaultWalletContext = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    step: CONNECT_WALLET_STEP;
    setStep: (step: CONNECT_WALLET_STEP) => void;
    walletChainType: ChainTypeValue;
    setWalletChainType: (type: ChainTypeValue) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    selectedWalletChainType: ChainTypeValue | undefined;
    setSelectedWalletChainType: (type: ChainTypeValue | undefined) => void;
    walletMetadata: Record<any, WalletMetadata>;
    selectedWalletMetadata: WalletMetadata | undefined;
    userData: TODO;
    setUserData: (userData: TODO) => void;
}

const defaultValue: DefaultWalletContext = {
  isOpen: false,
  setIsOpen: (_isOpen: boolean) => { },
  step: "CHOOSE_A_NETWORK",
  setStep: (_step: CONNECT_WALLET_STEP) => { },
  walletChainType: CHAIN_TYPE.SOLANA,
  setWalletChainType: (_type: ChainTypeValue) => {},
  isLoggedIn: false,
  setIsLoggedIn: (_isLoggedIn: boolean) => {},
  selectedWalletChainType: undefined,
  setSelectedWalletChainType: (_type: ChainTypeValue | undefined) => { },
  walletMetadata: {},
  selectedWalletMetadata: undefined,
  userData: undefined,
  setUserData: (_userData: TODO) =>  {},
}

const WalletModalContext = createContext(defaultValue)

export const WalletModalProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setGlobalIsOpen] = useState<boolean>(defaultValue.isOpen)
  const setIsOpen = useCallback((_isOpen: boolean) => { setGlobalIsOpen(_isOpen) }, [])

  const [step, setGlobalStep] = useState<CONNECT_WALLET_STEP>(defaultValue.step as CONNECT_WALLET_STEP);
  const setStep = useCallback((_step: CONNECT_WALLET_STEP) => { setGlobalStep(_step)}, [])

  const [walletChainType, setGlobalWalletChainType] = useState<ChainTypeValue>(defaultValue.walletChainType)
  const setWalletChainType = useCallback((_type: ChainTypeValue) => { setGlobalWalletChainType(_type as ChainTypeValue)}, [])

  const [selectedWalletChainType, setGlobalSelectedWalletChainType] = useState<DefaultWalletContext['selectedWalletChainType']>(undefined)
  const setSelectedWalletChainType = useCallback((_type: ChainTypeValue | undefined) => { setGlobalSelectedWalletChainType(_type as ChainTypeValue) }, [])

  const [isLoggedIn, setGlobalIsLoggedIn] = useState<boolean>(defaultValue.isLoggedIn)
  const setIsLoggedIn = useCallback((_isLoggedIn: boolean) => { setGlobalIsLoggedIn(_isLoggedIn) }, [])

    const [userData, setGlobalUserData] = useState<TODO>(defaultValue.userData)
    const setUserData = useCallback((_userData: TODO) => { setGlobalUserData(_userData) }, [])

    const {
        wallet: solanaWallet,
        publicKey,
        disconnect: disconnectSolana,
        signMessage: solanaSignMessage,
    } = useSolanaWallet();
    const { 
        isConnected: evmIsConnected,
        address: evmAddress,
        disconnect: disconnectEVM,
        signMessage: evmSignMessage,
    } = useEVMClient();

    const MSG = typeof window === "undefined" ? "" : `
${window.location.host} wants you to sign a message to login
----------------------
See privacy and policy at ${window.location.host}/privacy-policy
    `;
  const walletMetadata: Record<any, WalletMetadata> = useMemo(() => ({
    [CHAIN_TYPE.SOLANA]: {
        isConnected: solanaWallet?.adapter?.connected as boolean,
        address: publicKey?.toString() as string,
        disconnect: disconnectSolana,
        icon: solanaWallet?.adapter.icon as any,
        signMsg: async () => {
            const encodedMessage = new TextEncoder().encode(MSG);
            const signedMessage = await solanaSignMessage?.(encodedMessage);
            const signature = base58.encode(signedMessage as Uint8Array);
            return signature;
        },
    },
    [CHAIN_TYPE.EVM]: {
        isConnected: evmIsConnected as boolean,
        address: evmAddress as string,
        disconnect: disconnectEVM,
        icon: null,
        signMsg: async () => {
            return evmSignMessage(MSG)
        },
    },
  }), [
        publicKey,
        solanaWallet,
        disconnectSolana,
        evmIsConnected,
        evmAddress,
        disconnectEVM,
        evmSignMessage,
        solanaSignMessage,
        MSG,
  ])

    const selectedWalletMetadata = useMemo(() => {
        if (selectedWalletChainType) {
            return walletMetadata[selectedWalletChainType];
        }
    }, [walletMetadata, selectedWalletChainType])

    useEffect(() => {
        async function init() {
            const signature = await selectedWalletMetadata?.signMsg();
            console.log(signature);
            setUserData({ address: selectedWalletMetadata?.address });
        }
        if (
            selectedWalletChainType &&
            selectedWalletMetadata &&
            selectedWalletMetadata.isConnected &&
            !userData
        ) {
            init();
        }
    }, [
        selectedWalletChainType,
        selectedWalletMetadata,
        userData,
        setUserData,
    ])

  return (
    <WalletModalContext.Provider
      value={{
        setIsOpen: setIsOpen,
        isOpen: isOpen,
        step: step,
        setStep: setStep,
        walletChainType: walletChainType as any,
        setWalletChainType: setWalletChainType,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        selectedWalletChainType: selectedWalletChainType as any,
        setSelectedWalletChainType: setSelectedWalletChainType,
        walletMetadata: walletMetadata,
        selectedWalletMetadata: selectedWalletMetadata,
        userData: userData,
        setUserData: setUserData,
      }}
    >
      {children}
    </WalletModalContext.Provider>
  )
}

export const useWalletModalContext = () => {
  const walletModalContext = useContext(WalletModalContext);

  return walletModalContext
} 