import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const CategoryMealsScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <Text>CategoryMeals screen</Text>

            <Button
                title="Go to the Meal"
                onPress={() => navigation.navigate('Meal')}
            />

            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
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

export default CategoryMealsScreen;
