import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

import colors from '../../constants/colors';


const ProductListScreen = () => {
    const userProducts = useSelector((state) => state.products.byUser);

    const onSelectPress = (item) => navigation.navigate('Product', {data: item});

    return (
        <FlatList
            data={userProducts}
            renderItem={({ item }) => (
                <ProductItem
                    item={item}
                    onSelectPress={() => onSelectPress(item)}
                    leftButton={(
                        <Button
                            color={colors.primary}
                            title="Edit"
                            onPress={() => onSelectPress(item)}
                        />
                    )}
                    rightButton={(
                        <Button
                            color={colors.primary}
                            title="Delete"
                            onPress={() => {}}
                        />
                    )}
                />
            )}
        />
    );
};

export default ProductListScreen;
