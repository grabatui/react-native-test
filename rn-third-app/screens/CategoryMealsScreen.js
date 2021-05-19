import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { MEALS } from '../data/dummy';
import MealItem from '../components/MealItem';


const CategoryMealsScreen = ({ navigation, route }) => {
    const categoryMeals = MEALS.filter((meal) => {
        return meal.categoriesIds.indexOf(route.params.category.id) >= 0;
    });

    const renderGridItem = (data) => {
        return (
            <MealItem
                title={data.item.title}
                data={data.item}
                duration={data.item.duration + 'm'}
                complexity={data.item.complexity.toUpperCase()}
                affordability={data.item.affordability.toUpperCase()}
                image={data.item.imageUrl}
                onPress={() => {
                    navigation.navigate('Meal', {
                        meal: data.item
                    });
                }}
            />
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                numColumns={1}
                data={categoryMeals}
                renderItem={renderGridItem}
                style={styles.list}
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
    list: {
        width: '95%',
    },
});

export default CategoryMealsScreen;
