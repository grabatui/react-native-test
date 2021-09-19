import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";

import colors from "../constants/colors";


const Place = ({ data, onPress }) => {
    let TouchableComponent = (Platform.OS == 'android' && Platform.Version > 21)
        ? TouchableNativeFeedback
        : TouchableOpacity;

    return (
        <TouchableComponent onPress={onPress} style={styles.wrapper}>
            <Image
                style={styles.image}
                source={{ uri: data.image }}
            />

            <View style={styles.infoWrapper}>
                <Text style={styles.title}>{data.title}</Text>
                
                <Text style={styles.address}>{data.address}</Text>
            </View>
        </TouchableComponent>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: colors.primary,
        borderWidth: 1,
    },
    infoWrapper: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    address: {
        color: '#666',
        fontSize: 16,
    },
});

export default Place;
