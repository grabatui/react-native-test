import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

import colors from '../../constants/colors';


const ProductItem = ({ item, onViewDetailsPress, onCartPress }) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
                <Image
                    source={{uri: item.imageUrl}}
                    style={styles.image}
                />
            </View>

            <View style={styles.textsWrapper}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.buttonsWrapper}>
                <Button
                    color={colors.primary}
                    title="View Details"
                    onPress={onViewDetailsPress}
                />

                <Button
                    color={colors.primary}
                    title="To Cart"
                    onPress={onCartPress}
                />
            </View>
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
        height: 300,
        margin: 20,
    },
    imageWrapper: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20,
    },
    textsWrapper: {
        alignItems: 'center',
        height: '15%',
        padding: 10,
    },
});

export default ProductItem;
