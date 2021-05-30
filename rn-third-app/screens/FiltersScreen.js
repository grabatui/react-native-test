import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Filter from '../components/Filter';


const FiltersScreen = ({ navigation }) => {
    const [isGlutenFree, setGlutenFree] = useState(false);
    const [isLactoseFree, setLactoseFree] = useState(false);
    const [isVegan, setVegan] = useState(false);
    const [isVegetarian, setVegetarian] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Save'
                        iconName='ios-save'
                        onPress={() => {
                            navigation.setParams({isGlutenFree, isLactoseFree, isVegan, isVegetarian});
                        }}
                    />
                </HeaderButtons>
            ),
        });
    });

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>

            <Filter
                title="Gluten-free"
                value={isGlutenFree}
                onValueChange={(newValue) => setGlutenFree(newValue)}
            />

            <Filter
                title="Lactose-free"
                value={isLactoseFree}
                onValueChange={(newValue) => setLactoseFree(newValue)}
            />

            <Filter
                title="Vegan"
                value={isVegan}
                onValueChange={(newValue) => setVegan(newValue)}
            />

            <Filter
                title="Vegetarian"
                value={isVegetarian}
                onValueChange={(newValue) => setVegetarian(newValue)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
});

export default FiltersScreen;
