import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const MealsScreen = ({ navigation, route }) => {
    const meal = route.params.meal;

    return (
        <View style={styles.screen}>
            <Text>{meal.title}</Text>

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
