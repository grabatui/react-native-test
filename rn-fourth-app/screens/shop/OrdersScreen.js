import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';


const OrdersScreen = () => {
    const orders = useSelector((state) => state.orders.all);

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id + ''}
            renderItem={({ item }) => <OrderItem item={item} />}
        />
    );
};

export default OrdersScreen;
