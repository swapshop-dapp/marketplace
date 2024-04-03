"use client"

import { Web3Modal } from '@web3modal/react'
import { WALLET_CONNECT_WALLET_ID, ethereumClient } from '../consts/wagmiConfig'

export const EVMWalletModal = () => {
  return (
    <Web3Modal
      projectId={`${process.env.NEXT_PUBLIC_PROJECT_ID}`}
      ethereumClient={ethereumClient}
      explorerExcludedWalletIds={[
        WALLET_CONNECT_WALLET_ID.METAMASK
      ]}
    />
  )
}