import { GFooter } from '@app/components/Footer';
import { Header } from '@app/components/Header';
import { Navigator } from '@app/components/Navigator';
import { themes } from '@app/themes';
import {
  Flowbite,
  ThemeModeScript
} from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SolanaWalletContext } from './components/SolanaWalletContext';
import { WalletModal } from './components/WalletModal';
import { WalletModalProvider } from './context/walletContext';
import "./globals.css";

const inter = Inter({subsets: [ "latin" ]});

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
        <html lang="en">
        <head>
            <ThemeModeScript/>
        </head>
        <body className={'w-screen p-1 md:px-32'}>
          <WalletModalProvider>
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
          </WalletModalProvider>
        </body>
        </html>
    );
}
