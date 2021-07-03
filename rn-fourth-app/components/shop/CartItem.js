import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const CartItem = ({ item, onRemovePress }) => {
    let TouchableComponent = (Platform.OS == 'android' && Platform.Version > 21)
        ? TouchableNativeFeedback
        : TouchableOpacity;

    return (
        <View style={styles.wrapper}>
            <View style={styles.informationWrapper}>
                <Text style={styles.quantityText}>{item.quantity}&nbsp;</Text>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>

            <View style={styles.informationWrapper}>
                <Text style={styles.amountText}>${item.price * item.quantity}&nbsp;</Text>

                <TouchableComponent onPress={onRemovePress} style={styles.delete}>
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color="red"
                    />
                </TouchableComponent>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    informationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
    },
    titleText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    amountText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    delete: {
        marginLeft: 20,
    },
});

export default CartItem;
