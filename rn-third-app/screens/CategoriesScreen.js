import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy';
import CategoryItem from '../components/CategoryItem';


const CategoriesScreen = ({ navigation }) => {
    const renderGridItem = (data) => {
        return (
            <CategoryItem
                title={data.item.title}
                color={data.item.color}
                onPress={() => {
                    navigation.navigate('CategoryMeals', {
                        category: data.item
                    });
                }}
            />
        );
    };

    return (
        <FlatList
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem}
        />
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoriesScreen;
