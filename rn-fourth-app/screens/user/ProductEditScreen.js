import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';


const ProductEditScreen = ({ route, navigation }) => {
    const data = route.params.data || {};

    const [saveData, setSaveData] = useState(data);

    const setSaveDataValue = (label, value) => {
        setSaveData((state) => ({
            ...state,
            [label]: value,
        }));
    };

    const dispatch = useDispatch();

    const onSubmit = useCallback(
        () => {
            if (data && data.id) {
                dispatch(
                    updateProduct(data.id, saveData)
                );
            } else {
                dispatch(
                    createProduct(saveData)
                )
            }
        },
        [saveData]
    );

    useEffect(
        () => navigation.setParams({onSubmit}),
        [onSubmit]
    );

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={saveData.title}
                        onChangeText={(value) => setSaveDataValue('title', value)}
                    />
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={saveData.imageUrl}
                        onChangeText={(value) => setSaveDataValue('imageUrl', value)}
                    />
                </View>

                { ! data.price && (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={saveData.price ? saveData.price + '' : ''}
                            onChangeText={(value) => setSaveDataValue('price', parseFloat(value))}
                        />
                    </View>
                )}

                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={saveData.description}
                        onChangeText={(value) => setSaveDataValue('description', value)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});

export default ProductEditScreen;
