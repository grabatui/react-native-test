import React from 'react';
import { StyleSheet, View, Text, Image, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';


const ProductItem = ({ item, onSelectPress, leftButton, rightButton }) => {
    let TouchableComponent = (Platform.OS == 'android' && Platform.Version > 21)
        ? TouchableNativeFeedback
        : TouchableOpacity;

    return (
        <View style={styles.wrapper}>
            <TouchableComponent onPress={onSelectPress} useForeground>
                <View>
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
                        {leftButton || ''}

                        {rightButton || ''}
                    </View>
                </View>
            </TouchableComponent>
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
        overflow: 'hidden',
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
        marginVertical: 2,
        fontFamily: 'open-sans-bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans',
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
