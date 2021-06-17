import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';


const ProductDetailScreen = ({ route }) => {
    const product = route.params.data;

    return (
        <View>
            <Text>Detail page</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default ProductDetailScreen;
