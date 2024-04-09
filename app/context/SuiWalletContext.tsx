import { WalletProvider } from "@suiet/wallet-kit";
import { ReactNode } from "react";

export const SuiWalletProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <WalletProvider autoConnect={false}>{children}</WalletProvider>;
};
