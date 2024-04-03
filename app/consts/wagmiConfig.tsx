"use client";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Chain } from 'viem/chains';
import { configureChains, createConfig } from 'wagmi';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
export const polygonAmoy: Chain = {
  id: 80_002,
  name: 'Polygon Amoy',
  network: 'maticmum',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-amoy.polygon.technology/'],
    },
    public: {
      http: ['https://rpc-amoy.polygon.technology/'],
    },
  }
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonAmoy],
  [w3mProvider({ projectId })]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    chains,
  }),
  publicClient,
  webSocketPublicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);

/**
 * @dev see https://walletconnect.com/explorer
 */
export const WALLET_CONNECT_WALLET_ID = {
  METAMASK: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
}