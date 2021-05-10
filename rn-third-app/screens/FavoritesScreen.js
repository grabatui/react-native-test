import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const FavoriesScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Favories screen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FavoriesScreen;
