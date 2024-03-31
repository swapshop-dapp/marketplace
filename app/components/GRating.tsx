"use client";

import { Rating } from 'flowbite-react';

export const GRating = () => {
    return (
        <Rating>
            <Rating.Star/>
            <Rating.Star/>
            <Rating.Star/>
            <Rating.Star/>
            <Rating.Star filled={false}/>
        </Rating>
    )
}