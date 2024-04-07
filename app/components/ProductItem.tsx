import {
    Avatar,
    Card,
    Rating
} from "flowbite-react";
import { FaSafari } from 'react-icons/fa6';

// @ts-ignore
export const ProductItem = ({product}) => {
    function handleClick() {
        return window.open(`products/${product.id}`, '_blank');
    }
    
    return (
        <Card
            className="max-h-sm max-w-sm hover:cursor-pointer"
            renderImage={() => <img
                src={product.images[0]}
                className={'!h-[345px]'}
                alt="Apple Watch Series 7 in colors pink, silver, and black"
            />}
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
                {product.title}
            </h5>
            <div className="flex items-center">
                <div className={'flex gap-1'}>
                    <img src="https://static.goswapshop.com/assets/usdc.svg" alt="" width={24}/>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                </div>
                <div className={'items-end self-end align-bottom dark:text-white'}>
                    <span>~</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</span>
                </div>
            </div>
        </Card>
    );
}
