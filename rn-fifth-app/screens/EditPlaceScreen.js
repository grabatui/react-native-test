import React, { useState } from "react";
import { ScrollView, View, Button, StyleSheet, Text, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import colors from "../constants/colors";
import { addPlace } from "../store/actions/place";
import ImageSelector from "../components/ImageSelector";


const EditPlaceScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [titleValue, setTitleValue] = useState('');

    const onTitleChanged = (value) => {
        setTitleValue(value);
    };

    const onButtonPressed = () => {
        dispatch(
            addPlace(titleValue)
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

                <ImageSelector />

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
        marginBottom: 15,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 1,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
});

export default EditPlaceScreen;
