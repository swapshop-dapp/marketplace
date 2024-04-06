import { CHAIN_ID_POLYGON, CONTRACTS, ChainId, coalesceChainName } from "@certusone/wormhole-sdk";
import { clusterApiUrl } from "@solana/web3.js";


export const NETWORKS = {
    TESTNET: "TESTNET",
    MAINNET: "MAINNET",
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

export const EVM_RPC = CLUSTER === NETWORKS.TESTNET ? {
    [CHAIN_ID_POLYGON]: 'https://endpoints.omniatech.io/v1/matic/mumbai/public'
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
