import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';

import colors from '../../constants/colors';


const ProductListScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.available);

    const dispatch = useDispatch();

    const onSelectPress = (item) => navigation.navigate('Product', {data: item});

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <ProductItem
                    item={item}
                    onSelectPress={() => onSelectPress(item)}
                    leftButton={(
                        <Button
                            color={colors.primary}
                            title="View Details"
                            onPress={() => onSelectPress(item)}
                        />
                    )}
                    rightButton={(
                        <Button
                            color={colors.primary}
                            title="To Cart"
                            onPress={() => {
                                dispatch(
                                    addToCart(item)
                                );
                            }}
                        />
                    )}
                />
            )}
        />
    );
};

export default ProductListScreen;
