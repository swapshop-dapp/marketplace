"use client";

import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import {
    Button,
    List,
    Modal
}                                       from "flowbite-react";
import Image                            from "next/image";
import { useMemo }                      from "react";
import {
    CHAIN_LOGO,
    CHAIN_TYPE,
    ChainTypeValue
}                                       from "../consts/chain";
import { useWalletModalContext }        from "../context/WalletContext";
import { useEVMClient }                 from "../hooks/useEVMClient";
import { EVMWalletList }                from "./EVMConnectWalletList";
import { SolanaConnectWalletDialog }    from "./SolanaConnectWalletList";
import { Center } from "./Center";

export const ToggleWalletModalBtn = ({
                                         className,
                                     }: any) => {
    const walletContext                                                                 = useWalletModalContext();
    const {wallet: solanaWallet, publicKey, disconnect: disconnectSolana}               = useSolanaWallet();
    const {isConnected: evmIsConnected, address: evmAddress, disconnect: disconnectEVM} = useEVMClient();
    
    const walletMeta = useMemo(() => ({
        [CHAIN_TYPE.SOLANA]: {
            isConnected: solanaWallet?.adapter?.connected,
            address: publicKey?.toString(),
            disconnect: disconnectSolana,
            icon: solanaWallet?.adapter.icon as any
        },
        [CHAIN_TYPE.EVM]: {
            isConnected: evmIsConnected,
            address: evmAddress,
            disconnect: disconnectEVM,
            icon: null
        },
    }), [
        publicKey,
        solanaWallet,
        disconnectSolana,
        evmIsConnected,
        evmAddress,
        disconnectEVM
    ])
    
    const selectedWalletMeta = useMemo(() =>
            walletMeta[walletContext.selectedWalletChainType],
        [ walletContext.selectedWalletChainType, walletMeta ]
    )
    const is0x               = selectedWalletMeta?.address?.startsWith("0x");
    
    return selectedWalletMeta.isConnected ? (
        <Button
            onClick={selectedWalletMeta.disconnect}
            className={`btn-goswapshop-bg-secondary ${className}`}
            color='gray'
        >
            {
                selectedWalletMeta.icon ? (
                    <Image
                        loading="lazy"
                        width={20}
                        height={20}
                        src={selectedWalletMeta.icon}
                        alt={walletContext.selectedWalletChainType}
                        className="mr-1"
                    />
                ) : (
                    <></>
                )
            }
            <Center>
                Disconnect {selectedWalletMeta?.address?.substring(0, is0x ? 6 : 3)}...
                {selectedWalletMeta?.address?.substring(selectedWalletMeta?.address?.length - (is0x ? 4 : 3))}
            </Center>
        </Button>
    ) : (
        <Button
            className={className}
            type="button"
            onClick={() => walletContext.setIsOpen(true)}
        >
            <Center>Connect Wallet</Center>
        </Button>
    )
}

const LeftMenu = ({
                      onClick
                  }: {
    onClick: any
}) => {
    const _onClick = onClick ? onClick : () => {
    };

    return (
        <List unstyled className="flex flex-row md:flex-col justify-evenly items-center gap-3 border-b-2 md:border-b-0 md:border-r-2 pb-4 md:pr-4 overflow-auto">
            {
                Object.values(CHAIN_TYPE).map((chain) => {
                    return (
                        <List.Item
                            key={chain}
                            onClick={() => _onClick(chain)}
                            className="flex cursor-pointer flex-col items-center shadow-2xl transition delay-100 duration-100 ease-in-out hover:-translate-y-1 hover:scale-110"
                        >
                            <div className="h-10">
                                <Image
                                    src={CHAIN_LOGO[chain]}
                                    alt={chain}
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <p className="text-center text-white">{chain}</p>
                        </List.Item>
                    )
                })
            }
        </List>
    )
}

export const WalletModal = () => {
    const walletContext  = useWalletModalContext();
    const MenuWalletList = {
        [CHAIN_TYPE.SOLANA]: SolanaConnectWalletDialog,
        [CHAIN_TYPE.EVM]: EVMWalletList,
    }
    const RightMenuContent      = MenuWalletList[walletContext.walletChainType];
    
    return (
        <Modal show={walletContext.isOpen} onClose={() => walletContext.setIsOpen(false)}>
            <Modal.Header></Modal.Header>
            <Modal.Body>
                <div className="flex flex-wrap flex-col md:flex-row">
                    <LeftMenu
                        onClick={(chain: ChainTypeValue) => {
                            walletContext.setWalletChainType(chain)
                        }}
                    />
                    <div className="mt-5 md:mt-0">
                        <RightMenuContent
                            onClose={() => {
                                walletContext.setSelectedWalletChainType(walletContext.walletChainType)
                                walletContext.setIsOpen(false)
                            }}
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
