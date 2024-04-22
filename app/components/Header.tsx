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
        <Navbar fluid rounded className={'mb-5'}>
            <Navbar.Brand href="/" className={'justify-center'}>
                <Image
                  loading="lazy"
                  width={100}
                  height={40}
                 src="https://static.goswapshop.com/logo.svg" className="mr-3 h-6 sm:h-9"
                     alt="GoSwapShop"/>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Navbar.Toggle className={"btn-goswapshop-bg text-white"}/>
            </div>
            <Navbar.Collapse>
                <div className={'flex flex-col justify-between gap-5 md:flex-row'}>
                    <div className={'flex justify-between gap-3'}>
                        <Navbar.Link href="/" active className={'text-lg'}>
                            For You
                        </Navbar.Link>
                        <Tooltip content={'Coming soon'}>
                            <Navbar.Link href="/" className={'text-lg'} disabled={true}>Nearby</Navbar.Link>
                        </Tooltip>
                    </div>

                <ToggleWalletModalBtn 
                  className={"mr-32 w-full md:absolute md:right-1 md:w-auto"} 
                />
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}
