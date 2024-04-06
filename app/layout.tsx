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
import { WalletModalProvider } from './context/walletContext';
import "./globals.css";

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
        <body className={'w-screen p-1 md:px-32'}>
          <WalletModalProvider>
            <WagmiConfig config={wagmiConfig}>
              <SolanaWalletContext>
                <Flowbite theme={{mode: 'dark', theme: themes}}>
                    <WalletModal />
                    <Header>
                        <Navigator></Navigator>
                    </Header>
                    {children}
                    <GFooter></GFooter>
                </Flowbite>
              </SolanaWalletContext>
            </WagmiConfig>
            <EVMWalletModal />
          </WalletModalProvider>
        </body>
        </html>
    );
}
