"use client";

import { WalletName, WalletReadyState } from "@solana/wallet-adapter-base";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";
import { List } from "flowbite-react";
import Image from "next/image";
import { useCallback, useMemo } from "react";


const DetectedWalletListItem = ({
  wallet,
  select,
  onClose,
}: {
  wallet: Wallet;
  select: (walletName: WalletName) => void;
  onClose: () => void;
}) => {
  const handleWalletClick = useCallback(() => {
    select(wallet.adapter.name);
    onClose();
  }, [select, onClose, wallet]);

  return (
    <List.Item onClick={handleWalletClick} className="cursor-pointer">
      <WalletListItem wallet={wallet} text={wallet.adapter.name} />
    </List.Item>
  );
};

const WalletListItem = ({ wallet, text }: { wallet: Wallet; text: string }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div>
        <Image
          loading="lazy"
          width={30}
          height={30}
          src={wallet.adapter.icon}
          alt={wallet.adapter.name}
        />
      </div>
      <span>{text}</span>
    </div>
  );
};

export const SolanaConnectWalletDialog = ({
  onClose
}: {
  onClose: () => void
}) => {
  const { wallets, select } = useWallet();

  const [detected, undetected] = useMemo(() => {
    const detected: Wallet[] = [];
    const undetected: Wallet[] = [];
    for (const wallet of wallets) {
      if (
        wallet.readyState === WalletReadyState.Installed ||
        wallet.readyState === WalletReadyState.Loadable
      ) {
        detected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.NotDetected) {
        undetected.push(wallet);
      }
    }
    return [detected, undetected];
  }, [wallets]);

  return(
    <List unstyled className="flex grow flex-col gap-5 pl-5">
      {detected.map((wallet) => (
        <DetectedWalletListItem
          wallet={wallet}
          select={select}
          onClose={onClose}
          key={wallet.adapter.name}
        />
      ))}
      {undetected && <hr />}
      {undetected.map((wallet) => (
        <List.Item
          onClick={onClose}
          key={wallet.adapter.name}
          className="cursor-pointer "
        >
          <WalletListItem
            wallet={wallet}
            text={"Install " + wallet.adapter.name}
          />
        </List.Item>
      ))}
    </List>   
  )
}