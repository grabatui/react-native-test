import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { MEALS } from '../data/dummy';


const CategoryMealsScreen = ({ navigation, route }) => {
    const categoryMeals = MEALS.filter((meal) => {
        return meal.categoriesIds.indexOf(route.params.category.id) >= 0;
    });

    const renderGridItem = (data) => {
        return <View><Text>{data.item.title}</Text></View>
    };

    return (
        <View style={styles.screen}>
            <FlatList
                numColumns={1}
                data={categoryMeals}
                renderItem={renderGridItem}
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
