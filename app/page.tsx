"use client"
import { ProductList } from '@app/components/ProductList';
import { Categories }  from '@app/components/Categories';
import { HeroSection } from '@app/components/HeroSection';
import axios           from 'axios'
import {
    useEffect,
    useState
}                      from 'react';


export default function Home({}) {
    const [ product, setProduct ] = useState([])
    useEffect(() => {
        axios.get(`https://product.goswapshop.com/v1/product`).then((res) => {
            setProduct(res.data.data)
        })
        
    }, [ !product.length ]);    // useEffect(() => {
    //
    // }, [])
    return (
        <div>
            <HeroSection></HeroSection>
            <section className={'h-1'}>
                <Categories></Categories>
            </section>
            <main className="mt-20 flex flex-col bg-gray-800">
                <div className={'my-10 min-h-full px-4'}>
                    <div className={'flex w-full justify-between'}>
                        <span className={'text-3xl text-white '}>Newest</span>
                        <a href="" className={'text-gray-300 underline'}>See more</a>
                    </div>
                    <ProductList className={'py-3'} data={product}></ProductList>
                </div>
                <div className={'my-10 min-h-full px-4'}>
                    <div className={'flex w-full justify-between'}>
                        <span className={'text-3xl text-white '}>Hot deal - Best price</span>
                        <a href="" className={'text-gray-300 underline'}>See more</a>
                    </div>
                    <ProductList className={'py-3'} data={product}></ProductList>
                </div>
                <div className={'my-10 min-h-full px-4'}>
                    <div className={'flex w-full justify-between'}>
                        <span className={'text-3xl text-white '}>Hot Sellers</span>
                        <a href="" className={'text-gray-300 underline'}>See more</a>
                    </div>
                    <ProductList className={'py-3'} data={product}></ProductList>
                </div>
            </main>
        </div>
    );
}

