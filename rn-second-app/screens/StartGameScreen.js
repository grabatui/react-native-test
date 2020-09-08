import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';


const getCurrentButonWidth = () => {
    return Dimensions.get('window').width / 4;
};


const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [selectedNumber, setSelectedNumber] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(getCurrentButonWidth());

    const onInputChangeText = (value) => {
        setEnteredValue(value);
    };

    const onResetButtonClick = () => {
        setEnteredValue('');

        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(getCurrentButonWidth());
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const onConfirmButtonClick = () => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a valid number between 1 and 99!',
                [
                    {text: 'Okay', 'style': 'destructive', onPress: onResetButtonClick}
                ]
            );

            return;
        }

        setSelectedNumber(chosenNumber);

        setEnteredValue('');

        setConfirmed(true);

        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected:</Text>

                <NumberContainer>{selectedNumber}</NumberContainer>

                <MainButton onPress={() => props.onStartGamePressed(selectedNumber)}>START GAME</MainButton>
            </Card>
        );
    }

    const buttonWidthStyle = {...styles.button, minWidth: buttonWidth};

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>

                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>

                            <Input
                                value={enteredValue}
                                style={styles.input}
                                onChangeText={onInputChangeText}
                                keyboardType="numeric"
                                maxLength={2}
                                blurOnSubmit
                            />

                            <View style={styles.buttonContainer}>
                                <View style={buttonWidthStyle}>
                                    <Button title="Reset" color={colors.accent} onPress={onResetButtonClick} />
                                </View>

                                <View style={buttonWidthStyle}>
                                    <Button title="Confirm" color={colors.primary} onPress={onConfirmButtonClick} />
                                </View>
                            </View>
                        </Card>

                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        maxWidth: '95%',
        width: '80%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
    },
    button: {},
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    }
});

export default StartGameScreen;
