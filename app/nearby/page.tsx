import { ProductList } from '@app/components/ProductList';

export default function Home() {
    return (
        <main className="flex gap-2 dark:bg-gray-800 ">
            <ProductList className={'py-3'}></ProductList>
        </main>
    );
}
