"use client"
import { useEVMClient } from '@/app/hooks/useEVMClient';
import { GCarousel } from '@app/components/Carousel';
import { GRating } from '@app/components/GRating';
import { handleRedeem, handleTransfer } from "@app/utils/wormhole-sdk";
import { CHAIN_ID_POLYGON, CHAIN_ID_SOLANA, hexToUint8Array } from '@certusone/wormhole-sdk';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import {
    Avatar,
    Button
} from 'flowbite-react';
import { usePathname } from 'next/navigation';
import {
    useEffect,
    useState
} from 'react';
import { FaSafari } from 'react-icons/fa6';
const SOL_PRICE = 181; // USDC

export default function ProductDetail() {
    const solanaWallet = useSolanaWallet()
    const evmWallet = useEVMClient()

    const pathname                = usePathname()
    const [ product, setProduct ] = useState({
        id: 1,
        images: [],
        title: '',
        price: 0
    })
    const id                      = pathname.split('/').pop()
    useEffect(() => {
        axios.get(`https://product.goswapshop.com/v1/product/${id}`).then((res) => {
            setProduct(res.data.data)
        })
    }, [ id ]);
    return (
        <div className={'min-h-screen py-20'}>
            <div className={'grid grid-cols-2 gap-10'}>
                <GCarousel images={product.images || []}></GCarousel>
                <div className={'text-4xl text-white'}>
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.title}
                    </h5>
                    <div className="flex flex-col items-start justify-center md:gap-4">
                        <div className={'flex gap-1'}>
                            <img src="https://static.goswapshop.com/assets/usdc.svg" alt="" width={24}/>
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price} </span>
                            <span className={'self-center align-middle text-xl'}>(${product.price})</span>
                        </div>
                        <div className='flex'>
                            <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png" alt="" width={35} className='mr-1 rounded-full'  />
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{(product.price / SOL_PRICE).toFixed(3)} </span>                            
                        </div>
                    </div>
                    <Button
                        color={'gray'}
                        className={'btn-goswapshop-bg-secondary my-2 self-end px-3 py-2 text-center align-middle'}
                        onClick={async () => {
                            await handleRedeem({
                                evmSigner: evmWallet.signer,
                                targetChain: CHAIN_ID_POLYGON,
                                signedVAA: hexToUint8Array(window.localStorage.getItem("VAA") as string),
                            })
                            window.localStorage.removeItem('VAA')
                        }}
                    >Claim The Order</Button>
                    
                    <div className={'flex md:mt-4 '}>
                        <div className={'grid grid-cols-2 gap-4'}>
                            <Avatar img="https://static.goswapshop.com/images/people/profile-picture-5.jpg" rounded
                                    bordered
                                    status="online" statusPosition="bottom-right">
                                <div className="space-y-1 font-medium dark:text-white">
                                    <div className={'text-xl'}>Yang</div>
                                </div>
                                <div className={'grid grid-cols-2 justify-between gap-2'}>
                                    <GRating></GRating>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">(91 reviews)</span>
                                </div>
                            </Avatar>
                            <div className={'items-end justify-end'}>
                                <div className={'gap-1'}>
                                        <span
                                            className="items-end justify-end align-middle text-sm text-gray-600 dark:text-gray-400">12 hours ago</span>
                                </div>
                                <div className={'flex items-center justify-around gap-1 align-middle text-white'}>
                                    <div className={'flex items-center gap-1 align-middle'}>
                                        <FaSafari size={16}/>
                                        <span className={'text-lg'}>Long Bien, Hanoi</span>
                                    </div>
                                    <span className={'text-sm'}>about 4km from you</span>
                                </div>
                            </div>
                            {/*<div>*/}
                            {/*    <span className="text-sm text-gray-600 dark:text-gray-400">12 hours ago</span>*/}
                            {/*    <div className={'flex gap-1 text-white items-center'}>*/}
                            {/*        <FaSafari size={19}/>*/}
                            {/*        <span>Hanoi</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div>
                        <div className={'flex text-lg text-white'}>
                            <h5 className="mr-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                Category:
                            </h5>
                            <div className={'text-lg text-white'}>
                                <span className={'text-lg text-white'}>Technology</span>
                            </div>
                        </div>
                        <div className={'flex text-lg text-white'}>
                            <h5 className="mr-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                Brand:
                            </h5>
                            <div className={'text-lg text-white'}>
                                <span className={'text-lg text-white'}>Apple</span>
                            </div>
                        </div>
                        <div className={'flex text-lg text-white'}>
                            <h5 className="mr-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                Status:
                            </h5>
                            <div className={'text-lg text-white'}>
                                <span className={'text-lg text-white'}>New</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col-start-1 col-end-2 w-full'}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.5442240551456!2d105.89329227602015!3d21.05091518701573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc1f2b82f87%3A0xb6554dd4a944f7cd!2sLongBien%20Golf%20Proshop!5e0!3m2!1sen!2s!4v1711872499928!5m2!1sen!2s"
                        height="350" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className={'w-full'}
                    ></iframe>
                </div>
            </div>
        </div>
    )
}