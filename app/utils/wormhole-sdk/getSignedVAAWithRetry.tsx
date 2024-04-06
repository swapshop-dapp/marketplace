"use client";

import {
    ChainId,
    getGovernorIsVAAEnqueued,
    getSignedVAA
} from "@certusone/wormhole-sdk";
import { WORMHOLE_RPC_HOSTS } from "./consts";

export const getSignedVAAWithRetry = async (
    emitterChain: ChainId,
    emitterAddress: string,
    sequence: string,
    retryAttempts = 0
) => {
    let currentWormholeRpcHost = -1;
    const getNextRpcHost = () =>
        ++currentWormholeRpcHost % WORMHOLE_RPC_HOSTS.length;
    let attempts = 0;
    while (true) {
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const rpcHost = WORMHOLE_RPC_HOSTS[getNextRpcHost()];
        const results = await Promise.allSettled([
            getSignedVAA(rpcHost, emitterChain, emitterAddress, sequence),
            getGovernorIsVAAEnqueued(rpcHost, emitterChain, emitterAddress, sequence),
        ]);
        if (results[0].status === "fulfilled") {
            return { vaaBytes: results[0].value.vaaBytes, isPending: false };
        }
        if (results[1].status === "fulfilled" && results[1].value.isEnqueued) {
            return { vaaBytes: undefined, isPending: true };
        }
  
        if (retryAttempts !== undefined && attempts > retryAttempts) {
            throw new Error(results[0].reason);
        }
    }
};