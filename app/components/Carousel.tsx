"use client";

import { Carousel }              from "flowbite-react";
import React, { ComponentProps } from 'react';
import classnames                from 'classnames';

export const GCarousel: React.FC<ComponentProps<any>> = ({className}) => {
    return (
        <div className={classnames("h-56 sm:h-64 xl:h-80 2xl:h-96", className)}>
            <Carousel>
                <img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>
                <img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>
                <img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>
                <img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>
                <img src="https://static.goswapshop.com/images/apple-watch.png" alt="..."/>
            </Carousel>
        </div>
    );
}
