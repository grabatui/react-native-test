import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';


const ProductListScreen = () => {
    const userProducts = useSelector((state) => state.products.byUser);

    return (
        <FlatList
            data={userProducts}
            renderItem={({ item }) => <ProductItem item={item} />}
        />
    );
};

export default ProductListScreen;
