import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const MealsScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <Text>Meals screen</Text>

            <Button
                title="Go back to the Categories"
                onPress={() => navigation.popToTop()}
            />
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

export default MealsScreen;
