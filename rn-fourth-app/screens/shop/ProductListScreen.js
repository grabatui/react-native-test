import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';


const ProductListScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.available);

    const dispatch = useDispatch();

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <ProductItem
                    item={item}
                    onViewDetailsPress={() => {
                        navigation.navigate('Product', {data: item});
                    }}
                    onCartPress={() => {
                        dispatch(
                            addToCart(item)
                        );
                    }}
                />
            )}
        />
    );
};

export default ProductListScreen;
