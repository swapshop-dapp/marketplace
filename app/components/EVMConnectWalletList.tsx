"use client";

import { useWeb3Modal } from "@web3modal/react";
import { List } from "flowbite-react";
import { useConnect } from "wagmi";
import MetaMaskIcon from '../assets/images/svg/metamask.svg';
import WalletConnectIcon from '../assets/images/svg/walletconnect.svg';
import { WalletListItem } from "./WalletListItem";

export enum ConnectType {
  METAMASK,
  WALLETCONNECT,
}

export const EVMWalletList = ({
  onClose
}: {
  onClose: () => void
}) => {
  const WALLET_LIST = [
    {
      connectType: ConnectType.WALLETCONNECT,
      name: "Wallet Connect",
      icon: WalletConnectIcon,
    },
    {
      connectType: ConnectType.METAMASK,
      name: "MetaMask",
      icon: MetaMaskIcon,
    },
  ];
  const { connectors: evmConnectors, connect: connectMetaMask } = useConnect();
  const { open } = useWeb3Modal();

  const metamask = async () => {
    if (typeof window.ethereum === 'undefined') {
      const metamaskAppDeepLink =
        'https://metamask.app.link/dapp/' +
        process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '');
      window.open(metamaskAppDeepLink, '_blank');
      return;
    }

    connectMetaMask({ connector: evmConnectors[1] });
  };

  const walletconnect = async () => {
    await open();
  };

  const handleClick = async (connectType: ConnectType) => {
    connectType === ConnectType.METAMASK ? await metamask() : await walletconnect()
    onClose();
  }

  return (
    <List unstyled className="flex grow flex-col gap-5 pl-5">
      {
        WALLET_LIST.map((wallet) => {
          return (
            <List.Item
              onClick={() => handleClick(wallet.connectType)}
              key={wallet.name}
              className="cursor-pointer"
            >
              <WalletListItem
                icon={wallet.icon}
                name={wallet.name}
              />
            </List.Item>
          )
        })
      }
    </List>
  )
}
