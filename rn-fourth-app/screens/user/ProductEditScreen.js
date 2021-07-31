import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';


const ProductEditScreen = ({ route, navigation }) => {
    const data = route.params.data || {};

    const [saveData, setSaveData] = useState(data);
    const [validData, setValidData] = useState({
        title: !!data.title,
        imageUrl: !!data.imageUrl,
        price: !!data.price,
    });

    const setSaveDataValue = (label, value) => {
        setSaveData((state) => ({
            ...state,
            [label]: value,
        }));
    };

    const setValidDataValue = (label, isValid) => {
        setValidData((state) => ({
            ...state,
            [label]: isValid,
        }));
    };

    const dispatch = useDispatch();

    const onSubmit = useCallback(
        () => {
            for (let validDataField of Object.keys(validData)) {
                if ( ! validData[validDataField]) {
                    Alert.alert(
                        'Wrong input!',
                        'Please check the errors in the form',
                        [
                            {text: 'Okay'},
                        ]
                    );

                    return;
                }
            }

            if (data && data.id) {
                dispatch(
                    updateProduct(data.id, saveData)
                );
            } else {
                dispatch(
                    createProduct(saveData)
                )
            }

            navigation.goBack();
        },
        [saveData]
    );

    useEffect(
        () => navigation.setParams({onSubmit}),
        [onSubmit]
    );

    const onTitleChanged = (value) => {
        if (value.trim().length <= 0) {
            setValidDataValue('title', false);
        } else {
            setValidDataValue('title', true);
        }

        setSaveDataValue('title', value);
    };

    const onImageUrlChanged = (value) => {
        if (value.trim().length <= 0) {
            setValidDataValue('imageUrl', false);
        } else {
            setValidDataValue('imageUrl', true);
        }

        setSaveDataValue('imageUrl', value);
    };

    const onPriceChanged = (value) => {
        value = parseFloat(value);

        if (value <= 0) {
            setValidDataValue('price', false);
        } else {
            setValidDataValue('price', true);
        }

        setSaveDataValue('price', value);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={saveData.title}
                        onChangeText={onTitleChanged}
                        autoCapitalize="sentences"
                        autoCorrect
                    />

                    { ! validData.title && (
                        <Text>Please enter a valid title</Text>
                    )}
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={saveData.imageUrl}
                        onChangeText={onImageUrlChanged}
                    />

                    { ! validData.imageUrl && (
                        <Text>Please enter a valid image url</Text>
                    )}
                </View>

                { ! data.price && (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={saveData.price ? saveData.price + '' : ''}
                            onChangeText={onPriceChanged}
                            keyboardType="number-pad"
                        />

                        { ! validData.price && (
                            <Text>Please enter a valid price</Text>
                        )}
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
