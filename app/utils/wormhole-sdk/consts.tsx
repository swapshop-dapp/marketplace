"use client";

import { CHAIN_ID_POLYGON, CONTRACTS, ChainId, coalesceChainName } from "@certusone/wormhole-sdk";
import { mainnetConnection, testnetConnection } from "@mysten/sui.js";
import { clusterApiUrl } from "@solana/web3.js";

export type WORMHOLE_CONTRACT_KEYS = keyof typeof CONTRACTS;
export type WORMHOLE_CONTRACT_VAUES = typeof CONTRACTS[WORMHOLE_CONTRACT_KEYS];
export const NETWORKS: Record<WORMHOLE_CONTRACT_KEYS, WORMHOLE_CONTRACT_KEYS> = {
    TESTNET: "TESTNET",
    MAINNET: "MAINNET",
    DEVNET: "DEVNET", // un-use
};

export const CLUSTER = NETWORKS.TESTNET; /// process.env.WORMHOLE_CLUSTER;

export const WORMHOLE_RPC_HOSTS =
    CLUSTER === NETWORKS.TESTNET
        ? [
            "https://guardian-01.testnet.xlabs.xyz",
            "https://guardian-02.testnet.xlabs.xyz",
            "https://wormhole-v2-testnet-api.certus.one",
        ]
        : ["http://localhost:7071"];

export const SOL_CUSTODY_ADDRESS =
    "GugU1tP7doLeTw9hQP51xRJyS8Da1fWxuiy2rVrnMD2m";

export const SOLANA_HOST = CLUSTER === NETWORKS.TESTNET
    ? clusterApiUrl("devnet")
    : clusterApiUrl('mainnet-beta');
export const SOL_TOKEN_BRIDGE_ADDRESS =
    CONTRACTS[CLUSTER].solana.token_bridge;

export const SOL_BRIDGE_ADDRESS =
    CONTRACTS[CLUSTER].solana.core;
export const SOLANA_TOKEN_METADATA_PROGRAM_URL =
     "https://github.com/metaplex-foundation/metaplex-program-library/tree/master/token-metadata/program";
export const MAX_VAA_UPLOAD_RETRIES_SOLANA = 5;


export const EVM_RPC = CLUSTER === NETWORKS.TESTNET ? {
    [CHAIN_ID_POLYGON]: 'https://polygon-mumbai-pokt.nodies.app'
} : {
    [CHAIN_ID_POLYGON]: 'https://polygon-pokt.nodies.app'
}

export const getTokenBridgeAddressForChain = (chainId: ChainId) =>
    CONTRACTS[CLUSTER][
        coalesceChainName(chainId)
        ].token_bridge || "";

export const getBridgeAddressForChain = (chainId: ChainId) =>
    CONTRACTS[CLUSTER][
        coalesceChainName(chainId)
        ].core || "";


export const SUI_CONNECTION =
  CLUSTER === NETWORKS.TESTNET ? testnetConnection : mainnetConnection;

export const SUI_NATIVE_DECIMALS = 9;
export const SUI_NATIVE_TOKEN_KEY = "0x2::sui::SUI";