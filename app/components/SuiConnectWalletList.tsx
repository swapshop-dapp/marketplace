"use client"

import { useWallet } from '@suiet/wallet-kit';
import { List } from 'flowbite-react';
import { WalletListItem } from './WalletListItem';

export const SuiConnectWalletList = ({ onClose }: { onClose: () => void }) => {
  const { allAvailableWallets, select } = useWallet();

  return (
    <List unstyled className="flex grow flex-col gap-5 pl-5">
      {allAvailableWallets.map((wallet) => (
        <List.Item
          onClick={() => {
            select(wallet.name)
            onClose()
          }}
          key={wallet.name}
          className="cursor-pointer "
        >
          <WalletListItem icon={wallet?.adapter?.icon} name={wallet.name} />
        </List.Item>
      ))}
    </List>
  )
}
