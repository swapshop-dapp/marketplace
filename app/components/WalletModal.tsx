"use client";

import { useWalletModal as useSolanaWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import EthLogo from '../assets/images/svg/eth.svg';
import SolanaLogo from '../assets/images/svg/solana.svg';
import { useWalletModalContext } from "../context/walletContext";

export const ToggleWalletModalBtn = ({ 
  title,
  className,
}: {
  title?: string
  className?: string
}) => {
  const walletContext = useWalletModalContext();

  return (
    <Button
      className={className}
      type="button"
      onClick={() => walletContext.setIsOpen(true)}
    >
      {title}
    </Button>
  )
}
export const WalletModal = () => {
  const walletContext = useWalletModalContext();
  const { setVisible: setSolanaModalVisible } = useSolanaWalletModal();

  return (
    <Modal show={walletContext.isOpen} onClose={() => walletContext.setIsOpen(false)}>
      <Modal.Header>Select Your Method</Modal.Header>
      <Modal.Body>
        <div className="flex flex-wrap justify-evenly">
          <div>
            <div 
              className="h-28 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              onClick={() => {
                setSolanaModalVisible(true)
                walletContext.setIsOpen(false)
              }}
            >
              <Image
                src={SolanaLogo}
                alt="solana"
                width={100}
                height={100}
              />
            </div>
            <p className="text-center text-white">Solana</p>
          </div>
          <div>
            <div className="h-28 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
              <Image
                src={EthLogo}
                alt="evm"
                width={100}
                height={100}
              />
            </div>
            <p className="text-center text-white">EVM</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="gray"
          className="btn-goswapshop-bg-secondary"
          onClick={() => walletContext.setIsOpen(false)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
