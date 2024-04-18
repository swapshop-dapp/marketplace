import { GFooter } from '@app/components/Footer';
import { Header } from '@app/components/Header';
import { Navigator } from '@app/components/Navigator';
import { themes } from '@app/themes';
import {
  Flowbite,
  ThemeModeScript
} from "flowbite-react";
import type { Metadata } from "next";
import { WagmiConfig } from 'wagmi';
import { EVMWalletModal } from './components/EVMWalletModal';
import { WalletModal } from './components/WalletModal';
import { wagmiConfig } from './consts/wagmiConfig';
import { SolanaWalletContext } from './context/SolanaWalletContext';
import { WalletModalProvider } from './context/WalletContext';
import "./globals.css";
import { CommonContextProvider } from './context/CommonContext';

export const metadata: Metadata = {
    title: "GoSwapShop",
    description: "Swap your stuff with GoSwapShop",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <ThemeModeScript/>
        </head>
        <body className={'p-1 md:px-32'}>
            <WagmiConfig config={wagmiConfig}>
                <SolanaWalletContext>
                    <Flowbite theme={{mode: 'dark', theme: themes}}>
                        <WalletModalProvider>
                            <CommonContextProvider>
                                <WalletModal />
                                <Header>
                                    <Navigator></Navigator>
                                </Header>
                                {children}
                                <GFooter></GFooter>
                            </CommonContextProvider>
                        </WalletModalProvider>
                    </Flowbite>
                </SolanaWalletContext>
            </WagmiConfig>
            <EVMWalletModal />
        </body>
        </html>
    );
}
