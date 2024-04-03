"use client";

import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { CHAIN_TYPE, ChainTypeValue } from "../consts/chain";

type CONNECT_WALLET_STEP = "CHOOSE_A_NETWORK" | "CONNECT_TO_WALLET";

const defaultValue = {
  isOpen: false,
  setIsOpen: (_isOpen: boolean) => { },
  step: "CHOOSE_A_NETWORK",
  setStep: (_step: CONNECT_WALLET_STEP) => { },
  walletChainType: CHAIN_TYPE.SOLANA,
  setWalletChainType: (_type: ChainTypeValue) => {},
  isLoggedIn: false,
  setIsLoggedIn: (_isLoggedIn: boolean) => {},
  selectedWalletChainType: CHAIN_TYPE.SOLANA,
  setSelectedWalletChainType: (_type: ChainTypeValue) => { },
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

  const [selectedWalletChainType, setGlobalSelectedWalletChainType] = useState<ChainTypeValue>(defaultValue.selectedWalletChainType)
  const setSelectedWalletChainType = useCallback((_type: ChainTypeValue) => { setGlobalSelectedWalletChainType(_type as ChainTypeValue) }, [])

  const [isLoggedIn, setGlobalIsLoggedIn] = useState<boolean>(defaultValue.isLoggedIn)
  const setIsLoggedIn = useCallback((_isLoggedIn: boolean) => { setGlobalIsLoggedIn(_isLoggedIn) }, [])

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