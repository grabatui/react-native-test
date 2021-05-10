import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../constants/colors'
import TitleText from './TitleText';


const Header = (props) => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold',
    },
});

export default Header;
