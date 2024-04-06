"use client"

import React, {
    ComponentProps,
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';


export const ProductDetail: React.FC<ComponentProps<any>> = ({product}) => {
    return (
        <div className="flex w-screen justify-center">
            <div className="w-1/2">
                <div className="flex justify-center">
                    <img src="https://via.placeholder.com/150" alt="product" />
                </div>
                <div className="flex justify-center">
                    <p className="text-2xl">Product Name</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-xl">Product Description</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-xl">Price: $100</p>
                </div>
                <div className="flex w-full">
                    <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}