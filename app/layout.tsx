import type { Metadata } from "next";
import { Inter }         from "next/font/google";
import {
    Flowbite,
    ThemeModeScript
}                        from "flowbite-react";
import "./globals.css";
import { Header }        from '@app/components/Header';
import { themes }        from '@app/themes';
import { GFooter }       from '@app/components/Footer';
import { Navigator }     from '@app/components/Navigator';

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
        <Flowbite theme={{mode: 'dark', theme: themes}}>
            <Header>
                <Navigator></Navigator>
            </Header>
            {children}
            <GFooter></GFooter>
        </Flowbite>
        </body>
        </html>
    );
}
