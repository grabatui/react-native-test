import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function GoalInput(props) {
    const { value, id } = props;

    return (
        <TouchableOpacity onPress={props.onDelete.bind(this, id)}>
            <View style={styles.listItem}>
                <Text>{value}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
    },
});
