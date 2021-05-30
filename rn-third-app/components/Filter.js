import React from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';

import colors from '../constants/colors';


const Filter = ({ title, value, onValueChange }) => {
    return (
        <View style={styles.filterWrapper}>
            <Text>{title}</Text>

            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    true: colors.primaryColor,
                }}
                thumbColor={Platform.OS === 'android' ? colors.primaryColor : ''}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    filterWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    },
});

export default Filter;
