import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy';


const renderGridItem = (data) => {
    return (
        <View style={styles.gridItem}>
            <Text>{data.item.title}</Text>
        </View>
    );
};

const CategoriesScreen = ({ navigation }) => {
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
