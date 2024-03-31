import React, { ComponentProps } from 'react';

export const ProductDetail: React.FC<ComponentProps<any>> = (props) => {
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
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}