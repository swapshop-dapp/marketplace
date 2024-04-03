"use client";

import ethIcon from '../assets/images/svg/eth.svg';
import polygonIcon from '../assets/images/svg/polygon.svg';
import solanaIcon from '../assets/images/svg/solana.svg';

export type ChainId = number;
export const CHAIN_TYPE = {
  SOLANA: 'SOLANA',
  EVM: 'EVM',
  // SUI: 'SUI'
} as const;
export type ChainTypeKey = keyof typeof CHAIN_TYPE;
export type ChainTypeValue = typeof CHAIN_TYPE[ChainTypeKey];
export interface ChainInfo {
  id: ChainId;
  name: string;
  logo: string;
  chainType: ChainTypeValue;
};

export const CHAIN_LOGO = {
  [CHAIN_TYPE.EVM]: ethIcon,
  [CHAIN_TYPE.SOLANA]: solanaIcon,
}

export const CHAIN_ID_UNSET = 0;
export const CHAIN_ID_SOLANA = 1;
export const CHAIN_ID_ETH = 2;
export const CHAIN_ID_TERRA = 3;
export const CHAIN_ID_BSC = 4;
export const CHAIN_ID_POLYGON = 5;
export const CHAIN_ID_AVAX = 6;
export const CHAIN_ID_OASIS = 7;
export const CHAIN_ID_ALGORAND = 8;
export const CHAIN_ID_AURORA = 9;
export const CHAIN_ID_FANTOM = 10;
export const CHAIN_ID_KARURA = 11;
export const CHAIN_ID_ACALA = 12;
export const CHAIN_ID_KLAYTN = 13;
export const CHAIN_ID_CELO = 14;
export const CHAIN_ID_NEAR = 15;
export const CHAIN_ID_MOONBEAM = 16;
export const CHAIN_ID_NEON = 17;
export const CHAIN_ID_TERRA2 = 18;
export const CHAIN_ID_INJECTIVE = 19;
export const CHAIN_ID_OSMOSIS = 20;
export const CHAIN_ID_SUI = 21;
export const CHAIN_ID_APTOS = 22;
export const CHAIN_ID_ARBITRUM = 23;
export const CHAIN_ID_OPTIMISM = 24;
export const CHAIN_ID_GNOSIS = 25;
export const CHAIN_ID_PYTHNET = 26;
export const CHAIN_ID_XPLA = 28;
export const CHAIN_ID_BTC = 29;
export const CHAIN_ID_BASE = 30;
export const CHAIN_ID_SEI = 32;
export const CHAIN_ID_ROOTSTOCK = 33;
export const CHAIN_ID_WORMCHAIN = 3104;
export const CHAIN_ID_SEPOLIA = 10002;

export const CHAINS: ChainInfo[] = [
  // {
  //   id: CHAIN_ID_ACALA,
  //   name: "Acala",
  //   logo: acalaIcon,
  // },
  // {
  //   id: CHAIN_ID_ALGORAND,
  //   name: "Algorand",
  //   logo: algorandIcon,
  // },
  // {
  //   id: CHAIN_ID_APTOS,
  //   name: "Aptos",
  //   logo: aptosIcon,
  // },
  // {
  //   id: CHAIN_ID_ARBITRUM,
  //   name: "Arbitrum",
  //   logo: arbitrumIcon,
  // },
  // {
  //   id: CHAIN_ID_AURORA,
  //   name: "Aurora",
  //   logo: auroraIcon,
  // },
  // {
  //   id: CHAIN_ID_AVAX,
  //   name: "Avalanche",
  //   logo: avaxIcon,
  // },
  // {
  //   id: CHAIN_ID_BASE,
  //   name: "Base Goerli",
  //   logo: baseIcon,
  // },
  // {
  //   id: CHAIN_ID_BSC,
  //   name: "Binance Smart Chain",
  //   logo: bscIcon,
  // },
  // {
  //   id: CHAIN_ID_CELO,
  //   name: "Celo",
  //   logo: celoIcon,
  // },
  // {
  //   id: CHAIN_ID_ETH,
  //   name: "Ethereum (Goerli)",
  //   logo: ethIcon,
  // },
  // {
  //   id: CHAIN_ID_SEPOLIA,
  //   name: "Ethereum (Sepolia)",
  //   logo: ethIcon,
  // },
  // {
  //   id: CHAIN_ID_FANTOM,
  //   name: "Fantom",
  //   logo: fantomIcon,
  // },
  // {
  //   id: CHAIN_ID_INJECTIVE,
  //   name: "Injective",
  //   logo: injectiveIcon,
  // },
  // {
  //   id: CHAIN_ID_KARURA,
  //   name: "Karura",
  //   logo: karuraIcon,
  // },
  // {
  //   id: CHAIN_ID_KLAYTN,
  //   name: "Klaytn",
  //   logo: klaytnIcon,
  // },
  // {
  //   id: CHAIN_ID_MOONBEAM,
  //   name: "Moonbeam",
  //   logo: moonbeamIcon,
  // },
  // {
  //   id: CHAIN_ID_NEAR,
  //   name: "Near",
  //   logo: nearIcon,
  // },
  // {
  //   id: CHAIN_ID_NEON,
  //   name: "Neon",
  //   logo: neonIcon,
  // },
  // {
  //   id: CHAIN_ID_OASIS,
  //   name: "Oasis",
  //   logo: oasisIcon,
  // },
  // {
  //   id: CHAIN_ID_OPTIMISM,
  //   name: "Optimism (Goerli)",
  //   logo: optimismIcon,
  // },
  {
    id: CHAIN_ID_POLYGON,
    name: "Polygon",
    logo: polygonIcon,
    chainType: CHAIN_TYPE.EVM
  },
  // {
  //   id: CHAIN_ID_SEI,
  //   name: "Sei",
  //   logo: seiIcon,
  // },
  {
    id: CHAIN_ID_SOLANA,
    name: "Solana",
    logo: solanaIcon,
    chainType: CHAIN_TYPE.SOLANA
  },
  // {
  //   id: CHAIN_ID_SUI,
  //   name: "Sui",
  //   logo: suiIcon,
  // },
  // {
  //   id: CHAIN_ID_TERRA,
  //   name: "Terra Classic",
  //   logo: terraIcon,
  // },
  // {
  //   id: CHAIN_ID_TERRA2,
  //   name: "Terra",
  //   logo: terra2Icon,
  // },
  // {
  //   id: CHAIN_ID_XPLA,
  //   name: "XPLA",
  //   logo: xplaIcon,
  // },
];
