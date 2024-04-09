import { SuiClient } from "@mysten/sui.js/client";

export const getSuiProvider = (connection: string) => new SuiClient({ url: connection });
