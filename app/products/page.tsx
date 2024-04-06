import { ProductList } from '@app/components/ProductList';

export default function Product() {
    return (
        <div className={'md:px-32'}>
            <main className="mt-20 flex flex-col bg-gray-800">
                <div className={'my-10 min-h-full px-4'}>
                    <div className={'flex w-full justify-between'}>
                        <span className={'text-3xl text-white '}>Newest</span>
                        <a href="" className={'text-gray-300 underline'}>See more</a>
                    </div>
                    <ProductList className={'py-3'}></ProductList>
                </div>
                <div className={'my-10 min-h-full px-4'}>
                    <div className={'flex w-full justify-between'}>
                        <span className={'text-3xl text-white '}>Hot deal - Best price</span>
                        <a href="" className={'text-gray-300 underline'}>See more</a>
                    </div>
                    <ProductList className={'py-3'}></ProductList>
                </div>
                <div className={'my-10 min-h-full px-4'}>
                    <div className={'flex w-full justify-between'}>
                        <span className={'text-3xl text-white '}>Hot Sellers</span>
                        <a href="" className={'text-gray-300 underline'}>See more</a>
                    </div>
                    <ProductList className={'py-3'}></ProductList>
                </div>
            </main>
        </div>
    );
}
