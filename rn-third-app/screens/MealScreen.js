import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import DefaultText from '../components/DefaultText';

import { toggleFavorite } from '../store/actions/meals';


const ListItem = ({ children }) => {
    return (
        <View style={styles.listItemWrapper}>
            <DefaultText>{children}</DefaultText>
        </View>
    );
};


const MealsScreen = ({ route, navigation }) => {
    const meal = route.params.meal;

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(
        () => dispatch(toggleFavorite(meal.id)),
        [dispatch, meal]
    );

    useEffect(
        () => navigation.setParams({toggleFavoriteHandler}),
        [toggleFavoriteHandler]
    );

    return (
        <ScrollView>
            <Image
                source={{uri: meal.imageUrl}}
                style={styles.image}
            />

            <View style={styles.details}>
                <DefaultText>{meal.duration}m</DefaultText>
                <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
            </View>

            <Text style={styles.subTitle}>Ingridients</Text>

            {meal.ingredients.map((ingredient) => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}

            <Text style={styles.subTitle}>Steps</Text>

            {meal.steps.map((step) => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    subTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
    },
    listItemWrapper: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
});

export default MealsScreen;
