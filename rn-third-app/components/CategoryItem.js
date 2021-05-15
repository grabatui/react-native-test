import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

const CategoryItem = ({ onPress, title, color }) => {
    let TouchableComponent = (Platform.OS == 'android' && Platform.Version > 21)
        ? TouchableNativeFeedback
        : TouchableOpacity;

    return (
        <View style={styles.wrapper}>
            <TouchableComponent style={{flex: 1}} onPress={onPress}>
                <View style={{...styles.container, ...{backgroundColor: color}}}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                </View>
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'right',
    },
});

export default CategoryItem;
