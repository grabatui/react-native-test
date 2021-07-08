import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';


const OrdersScreen = () => {
    const orders = useSelector((state) => state.orders.all);

    return (
        <FlatList
            data={orders}
            renderItem={({ order }) => (
                <Text>Hello!</Text>
            )}
        />
    );
};

export default OrdersScreen;
