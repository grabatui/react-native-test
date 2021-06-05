import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import MealItem from '../components/MealItem';


const MealList = ({ meals, onPressMeal, onEmpty }) => {
    if ( ! meals || meals.length <= 0) {
        return onEmpty || <View><Text>Empty</Text></View>
    }

    const renderGridItem = (data) => {
        return (
            <MealItem
                title={data.item.title}
                data={data.item}
                duration={data.item.duration + 'm'}
                complexity={data.item.complexity.toUpperCase()}
                affordability={data.item.affordability.toUpperCase()}
                image={data.item.imageUrl}
                onPress={onPressMeal.bind(this, data)}
            />
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                numColumns={1}
                data={meals}
                renderItem={renderGridItem}
                style={styles.list}
            />
        </View>
    );
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

export default MealList;
