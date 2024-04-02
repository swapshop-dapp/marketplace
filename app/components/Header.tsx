"use client";

import {
  Navbar,
  Tooltip
} from "flowbite-react";
import Image from "next/image";
import { ComponentProps } from 'react';
import { ToggleWalletModalBtn } from "./WalletModal";

export const Header: React.FC<ComponentProps<any>> = ({children}) => {
    return (
        <Navbar fluid rounded className={''}>
            <Navbar.Brand href="/" className={'justify-center'}>
                <Image
                  loading="lazy"
                  width={100}
                  height={40}
                 src="https://static.goswapshop.com/logo.svg" className="mr-3 h-6 sm:h-9"
                     alt="Flowbite React Logo"/>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Navbar.Toggle className={"btn-goswapshop-bg text-white"}/>
            </div>
            <Navbar.Collapse>
                <div className={'flex justify-between'}>
                    <div className={'flex justify-between gap-3'}>
                        <Navbar.Link href="/" active className={'text-lg'}>
                            For You
                        </Navbar.Link>
                        <Tooltip content={'Coming soon'}>
                            <Navbar.Link href="/" className={'text-lg'} disabled={true}>Nearby</Navbar.Link>
                        </Tooltip>
                    </div>

            <ToggleWalletModalBtn className={"mr-32 md:absolute md:right-1"} title="Connect Wallet" />
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}
