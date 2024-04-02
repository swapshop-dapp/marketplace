"use client";

import { ReactNode, createContext, useCallback, useContext, useState } from "react";

type CONNECT_WALLET_STEP = "CHOOSE_A_NETWORK" | "CONNECT_TO_WALLET";

const defaultValue = {
  isOpen: false,
  setIsOpen: (_isOpen: boolean) => { },
  step: "CHOOSE_A_NETWORK",
  setStep: (_step: CONNECT_WALLET_STEP) => { },
}
const WalletModalContext = createContext(defaultValue)

export const WalletModalProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setGlobalIsOpen] = useState(defaultValue.isOpen)
  const setIsOpen = useCallback((_isOpen: boolean) => { setGlobalIsOpen(_isOpen) }, [])

  const [step, setGlobalStep] = useState<CONNECT_WALLET_STEP>(defaultValue.step as CONNECT_WALLET_STEP);
  const setStep = useCallback((_step: CONNECT_WALLET_STEP) => { setGlobalStep(_step)}, [])

  return (
    <WalletModalContext.Provider
      value={{
        setIsOpen: setIsOpen,
        isOpen: isOpen,
        step: step,
        setStep: setStep
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