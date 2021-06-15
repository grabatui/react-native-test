import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';


const ProductListScreen = () => {
    const products = useSelector((state) => state.products.available);

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <ProductItem
                    item={item}
                    onViewDetailsPress={() => null}
                    onCartPress={() => null}
                />
            )}
        />
    );
};

export default ProductListScreen;
