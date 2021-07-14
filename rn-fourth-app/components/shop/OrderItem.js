import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import CartItem from './CartItem';

import colors from '../../constants/colors';


const OrderItem = ({ item }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.wrapper}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${item.totalAmount}</Text>
                <Text style={styles.date}>{item.dateForHumans}</Text>
            </View>

            <Button
                title={showDetails ? 'Hide Details' : 'Show Details'}
                color={colors.primary}
                onPress={() => {
                    setShowDetails((state) => ! state);
                }}
            />

            {showDetails && (
                <View style={styles.cartItems}>
                    {item.cartItems.map((cartItem) => (
                        <CartItem
                            item={cartItem}
                            key={cartItem.productId}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888',
    },
    cartItems: {
        width: '100%',
    },
});

export default OrderItem;
