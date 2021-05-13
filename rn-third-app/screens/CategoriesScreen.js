import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { CATEGORIES } from '../data/dummy';


const CategoriesScreen = ({ navigation }) => {
    const renderGridItem = (data) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('CategoryMeals', data.item)}
                style={styles.gridItem}
            >
                <View>
                    <Text>{data.item.title}</Text>
                </View>
            </TouchableOpacity>
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
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
    },
});

export default CategoriesScreen;
