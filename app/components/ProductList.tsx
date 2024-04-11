"use client"

import { ProductItem }    from '@app/components/ProductItem';
import {
    ComponentProps,
} from 'react';
import classnames         from 'classnames';

export const ProductList: React.FC<ComponentProps<any>> = ({data, className}) => {
    return (
        <div className={classnames(className, "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3")}>
            {data && data.length ? data.map((item: any) => {
                return <ProductItem product={item} key={item.id}></ProductItem>
            }) : (<></>)}
        </div>
    )
}