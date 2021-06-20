import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';

import colors from '../../constants/colors';


const ProductDetailScreen = ({ route }) => {
    const product = route.params.data;

    return (
        <ScrollView>
            <Image
                source={{uri: product.imageUrl}}
                style={styles.image}
            />

            <View style={styles.action}>
                <Button
                    title="Add to Cart"
                    onPress={() => {}}
                    color={colors.primary}
                />
            </View>

            <Text style={styles.price}>${product.price.toFixed(2)}</Text>

            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    action: {
        marginVertical: 10,
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans',
    },
});

export default ProductDetailScreen;
