import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';

import Input from '../../components/Input';


const ProductEditScreen = ({ route, navigation }) => {
    const data = route.params.data || {};
    const { id, title, imageUrl, price } = data;

    const [saveData, setSaveData] = useState(data);
    const [validData, setValidData] = useState({
        title: !!title,
        imageUrl: !!imageUrl,
        price: !!price,
    });

    const setSaveDataValue = useCallback(
        (label, value, isValid) => {
            setSaveData((state) => ({
                ...state,
                [label]: value,
            }));
    
            setValidData((state) => ({
                ...state,
                [label]: isValid,
            }));
        },
        [setSaveData, setValidData]
    );

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

            if (data && id) {
                dispatch(
                    updateProduct(id, saveData)
                );
            } else {
                dispatch(
                    createProduct(saveData)
                )
            }

            navigation.goBack();
        },
        [id, saveData, validData]
    );

    useEffect(
        () => navigation.setParams({onSubmit}),
        [onSubmit]
    );

    const onPriceInputChanged = useCallback(
        (label, value, isValid) => setSaveDataValue(label, parseFloat(value), isValid),
        [id]
    );

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="height"
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title"
                        initialValue={saveData.title}
                        initialIsValid={validData.title}
                        onInputChanged={setSaveDataValue}
                        autoCapitalize="sentences"
                        autoCorrect
                        vaidateRequired
                    />

                    <Input
                        id="imageUrl"
                        label="Image URL"
                        errorText="Please enter a valid image url"
                        initialValue={saveData.imageUrl}
                        initialIsValid={validData.imageUrl}
                        onInputChanged={setSaveDataValue}
                        vaidateRequired
                    />

                    { ! data.price && (
                        <Input
                            id="price"
                            label="Price"
                            errorText="Please enter a valid price"
                            keyboardType="number-pad"
                            validateMin={0}
                            onInputChanged={onPriceInputChanged}
                        />
                    )}

                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description"
                        initialValue={saveData.description}
                        initialIsValid={true}
                        onInputChanged={setSaveDataValue}
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    form: {
        margin: 20,
    },
});

export default ProductEditScreen;
