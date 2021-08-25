import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';
import { setOrders } from '../../store/actions/order';

import colors from '../../constants/colors';


const OrdersScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const orders = useSelector((state) => state.orders.all);

    const dispatch = useDispatch();

    const loadOrders = useCallback(
        async () => {
            setIsLoading(true);
    
            try {
                await dispatch(setOrders())
            } catch (exception) {
                setError(exception.message);
            }
    
            setIsLoading(false);
        },
        [dispatch, setIsLoading, setError]
    );

    useEffect(
        () => {
            navigation.addListener('focus', loadOrders);
        },
        [loadOrders]
    );

    useEffect(
        () => {
            dispatch(setOrders());
        },
        [dispatch]
    );

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if ( ! isLoading) {
        if (orders.length <= 0) {
            return (
                <View style={styles.loader}>
                    <Text>No orders found. Maybe start creating some!</Text>
                </View>
            );
        } else if (error) {
            return (
                <View style={styles.loader}>
                    <Text>An error occured!</Text>

                    <Button title="Try again" onPress={loadOrders} color={colors.primary} />
                </View>
            );
        }
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id + ''}
            renderItem={({ item }) => <OrderItem item={item} />}
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

export default OrdersScreen;
