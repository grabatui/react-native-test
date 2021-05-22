import React from 'react';

import { MEALS } from '../data/dummy';

import MealList from '../components/MealList';


const FavoriesScreen = ({ navigation }) => {
    const favoriteMeals = MEALS.filter((meal) => {
        return ['m1', 'm2'].indexOf(meal.id) >= 0;
    });

    return (
        <MealList
            meals={favoriteMeals}
            onPressMeal={(data) => {
                navigation.navigate('Meal', {
                    meal: data.item
                });
            }}
        />
    )
};

export default FavoriesScreen;
