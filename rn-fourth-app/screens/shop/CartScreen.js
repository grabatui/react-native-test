import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';

import colors from '../../constants/colors';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/order';


const CartScreen = () => {
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => Object.values(state.cart.items));

    const dispatch = useDispatch();

    return (
        <View style={styles.wrapper}>
            <View style={styles.summaryWrapper}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount}</Text>
                </Text>

                <Button
                    title="Order now"
                    color={colors.accent}
                    disabled={cartItems.length <= 0}
                    onPress={() => {
                        dispatch(
                            addOrder(cartItems, cartTotalAmount)
                        )
                    }}
                />
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.productId}
                renderItem={({ item }) => (
                    <CartItem
                        item={item}
                        onRemovePress={() => {
                            dispatch(
                                removeFromCart(item.productId)
                            );
                        }}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        margin: 20,
    },
    summaryWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
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
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: colors.accent,
    },
});

export default CartScreen;
