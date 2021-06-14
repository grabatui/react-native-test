import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';


const ProductListScreen = () => {
    const products = useSelector((state) => state.products.available);

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => {
                return (
                    <Text>{item.title}</Text>
                );
            }}
        />
    );
};

export default ProductListScreen;
