import { ProductItem }    from '@app/components/ProductItem';
import { ComponentProps } from 'react';
import classnames      from 'classnames';

export const ProductList: React.FC<ComponentProps<any>> = (props) => {
    return (
        <div className={classnames(props.className, "grid md:grid-cols-4 gap-3")}>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
            <ProductItem></ProductItem>
        </div>
    )
}