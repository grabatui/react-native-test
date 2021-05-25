import React from 'react';
import { Text, StyleSheet } from 'react-native';


const DefaultText = ({ children }) => {
    return (
        <Text style={styles.main}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    main: {
        fontFamily: 'open-sans',
    },
});

export default DefaultText;
