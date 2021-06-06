import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';


const CategoryMealsScreen = ({ navigation, route }) => {
    const availableMeals = useSelector((state) => state.meals.filtered);
    const favoriteMeals = useSelector((state) => state.meals.favorites);

    const categoryMeals = availableMeals.filter((meal) => {
        return meal.categoriesIds.indexOf(route.params.category.id) >= 0;
    });

    return (
        <MealList
            meals={categoryMeals}
            onPressMeal={(data) => {
                const isMealFavorite = favoriteMeals.some((favoriteMeal) => favoriteMeal.id === data.item.id);

                navigation.navigate('Meal', {
                    meal: data.item,
                    isMealFavorite
                });
            }}
            onEmpty={(
                <View style={styles.emptyWrapper}>
                    <DefaultText>No meals found. Check your filters!</DefaultText>
                </View>
            )}
        />
    )
};

const styles = StyleSheet.create({
    emptyWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoryMealsScreen;
