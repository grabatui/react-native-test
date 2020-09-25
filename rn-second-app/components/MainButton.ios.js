import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors'


const MainButton = (props) => {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <ButtonComponent onPress={props.onPress}>
                <View style={{...styles.button, ...props.style}}>
                    <Text style={{...styles.buttonText, ...props.textStyle}}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
    },
});

export default MainButton;
