"use client";

import {
    Avatar,
    Card,
    Rating
}                   from "flowbite-react";
import { FaSafari } from 'react-icons/fa6';

export const ProductItem = () => {
    function handleClick() {
        return window.open('products/1', '_blank');
    }
    
    return (
        <Card
            className="max-w-sm hover:cursor-pointer"
            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
            imgSrc="https://static.goswapshop.com/images/apple-watch.png"
            onClick={handleClick}
        >
            
            <div className="mb-2 mt-0.5 flex items-center justify-between">
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <div className={'flex flex-col'}>
                    <Avatar img="https://static.goswapshop.com/images/people/profile-picture-5.jpg" rounded bordered
                            status="online" statusPosition="bottom-right">
                        <div className="space-y-1 font-medium dark:text-white">
                            <div>Yang</div>
                        </div>
                        <Rating>
                            <Rating.Star/>
                            <Rating.Star/>
                            <Rating.Star/>
                            <Rating.Star/>
                            <Rating.Star filled={false}/>
                        </Rating>
                    </Avatar>
                </div>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">12 hours ago</span>
                    <div className={'flex items-center gap-1 text-white'}>
                        <FaSafari size={19}/>
                        <span>Hanoi</span>
                    </div>
                </div>
            </div>
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
            </h5>
            <div className="flex items-center">
                <div className={'flex gap-1'}>
                    <img src="https://static.goswapshop.com/assets/usdt.svg" alt="" width={24}/>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">599</span>
                </div>
                <div className={'items-end self-end align-bottom dark:text-white'}>
                    <span>~</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">$599</span>
                </div>
            </div>
        </Card>
    )
        ;
}
