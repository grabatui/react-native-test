import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { setProducts } from '../../store/actions/products';

import colors from '../../constants/colors';


const ProductListScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector((state) => state.products.available);

    const dispatch = useDispatch();

    const loadProducts = useCallback(
        async () => {
            setIsRefreshing(true);

            try {
                await dispatch(setProducts())
            } catch (exception) {
                setError(exception.message);
            }
            
            setIsRefreshing(false);
        },
        [dispatch, setIsLoading, setError]
    );

    useEffect(
        () => {
            navigation.addListener('focus', loadProducts);
        },
        [loadProducts]
    );

    useEffect(
        () => {
            setIsLoading(true);
            loadProducts().then(() => {
                setIsLoading(false);
            });
        },
        [loadProducts]
    );

    const onSelectPress = (item) => navigation.navigate('Product', {data: item});

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if ( ! isLoading) {
        if (products.length <= 0) {
            return (
                <View style={styles.loader}>
                    <Text>No products found. Maybe start adding some!</Text>
                </View>
            );
        } else if (error) {
            return (
                <View style={styles.loader}>
                    <Text>An error occured!</Text>

                    <Button title="Try again" onPress={loadProducts} color={colors.primary} />
                </View>
            );
        }
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
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

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductListScreen;
