import React from 'react';
import { TextInput, StyleSheet } from 'react-native';


const Input = (props) => {
    return <TextInput {...props} style={{...styles.main, ...props.style}} />
};

const styles = StyleSheet.create({
    main: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        height: 30,
        marginVertical: 10,
    },
});

export default Input;
