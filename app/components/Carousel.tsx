"use client";

import { Carousel }              from "flowbite-react";
import React, { ComponentProps } from 'react';

export const GCarousel: React.FC<ComponentProps<any>> = ({images}) => {
    return (
        <div className={"h-56 sm:h-64 xl:h-80 2xl:h-96"}>
            {images.length > 0 ? (
                <Carousel>
                    {images.map((image: string | undefined, index: React.Key | null | undefined) => (
                        // eslint-disable-next-line react/jsx-key
                        <img src={image} alt="..."/>
                    ))}
                    {/*<img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>*/}
                    {/*<img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>*/}
                    {/*<img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>*/}
                    {/*<img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>*/}
                    {/*<img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>*/}
                </Carousel>
            ) : <></>}
        </div>
    );
}
