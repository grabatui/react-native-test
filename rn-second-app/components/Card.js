import React from "react";
import { View, StyleSheet } from "react-native"


const Card = (props) => {
    return (
        <View style={{...styles.main, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingVertical: 20,
        paddingHorizontal: 5,
        borderRadius: 10,
        elevation: 6,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
    },
});

export default Card;
