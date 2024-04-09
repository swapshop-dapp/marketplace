"use client";

import { WalletProvider } from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import { ReactNode } from "react";

export const SuiWalletProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <WalletProvider autoConnect={false}>{children}</WalletProvider>;
};
