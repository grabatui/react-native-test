import React, { useState, useCallback } from "react";
import { ScrollView, View, Button, StyleSheet, Text, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import colors from "../constants/colors";
import { addPlace } from "../store/actions/place";
import ImageSelector from "../components/ImageSelector";
import LocationSelector from "../components/LocationSelector";


const EditPlaceScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();

    const [titleValue, setTitleValue] = useState('');
    const [imageValue, setImageValue] = useState('');
    const [locationValue, setLocationValue] = useState();

    const onTitleChanged = (value) => setTitleValue(value);
    const onImageChanged = (value) => setImageValue(value);
    const onLocationSelected = useCallback(
        (value) => {
            setLocationValue(value);
        },
        []
    );

    const onButtonPressed = () => {
        dispatch(
            addPlace(titleValue, imageValue, locationValue)
        );

        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>

                <TextInput
                    style={styles.input}
                    value={titleValue}
                    onChangeText={onTitleChanged}
                />

                <ImageSelector
                    onImageSelected={onImageChanged}
                    initialValue={imageValue}
                />

                <LocationSelector
                    navigation={navigation}
                    route={route}
                    onLocationSelected={onLocationSelected}
                />

                <Button
                    title="Save place"
                    color={colors.primary}
                    onPress={onButtonPressed}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
});

export default EditPlaceScreen;
