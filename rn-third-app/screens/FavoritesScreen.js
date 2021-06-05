import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';


const FavoriesScreen = ({ navigation }) => {
    const favoriteMeals = useSelector((state) => state.meals.favorites);

    return (
        <MealList
            meals={favoriteMeals}
            onPressMeal={(data) => {
                navigation.navigate('Meal', {
                    meal: data.item
                });
            }}
            onEmpty={(
                <View style={styles.emptyWrapper}>
                    <DefaultText>No favorite meals found. Start adding some!</DefaultText>
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

export default FavoriesScreen;
