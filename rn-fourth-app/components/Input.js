import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const INPUT_CHANGED = 'INPUT_CHANGED';
const INPUT_BLURED = 'INPUT_BLURED';


const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGED:
            state = {
                ...state,
                value: action.value,
                isValid: action.isValid,
            };
            break;

        case INPUT_BLURED:
            state = {
                ...state,
                touched: true,
            };
            break;
    }

    return state;
};


const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialIsValid,
        touched: false,
    });

    const { onInputChanged, id } = props;

    useEffect(
        () => {
            if (inputState.touched) {
                onInputChanged(id, inputState.value, inputState.isValid)
            }
        },
        [inputState, onInputChanged, id]
    );

    const onTextChanged = (newValue) => {
        let isValid = true;
        if (props.vaidateRequired && ! newValue) {
            isValid = false;
        }

        if (props.validateMin && +newValue < props.validateMin) {
            isValid = false;
        }

        if (props.validateMax && +newValue > props.validateMax) {
            isValid = false;
        }

        if (props.validateLength && newValue.length < props.validateLength) {
            isValid = false;
        }

        dispatch({
            type: INPUT_CHANGED,
            value: newValue,
            isValid,
        });
    };

    const onInputBlured = () => {
        dispatch({
            type: INPUT_BLURED,
        });
    };

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>

            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={onTextChanged}
                onBlur={onInputBlured}
            />

            { ! inputState.isValid && inputState.touched && (
                <View style={styles.errorWrapper}>
                    <Text style={styles.error}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
    errorWrapper: {
        marginVertical: 5,
    },
    error: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13,
    },
});

export default Input;