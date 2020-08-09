import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';


const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [selectedNumber, setSelectedNumber] = useState();
    const [confirmed, setConfirmed] = useState(false);

    const onInputChangeText = (value) => {
        setEnteredValue(value);
    };

    const onResetButtonClick = () => {
        setEnteredValue('');

        setConfirmed(false);
    };

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

                <Button title="START GAME" onPress={() => props.onStartGamePressed(selectedNumber)} />
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>

                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>

                    <Input
                        value={enteredValue}
                        style={styles.input}
                        onChangeText={onInputChangeText}
                        keyboardType="numeric"
                        maxLength={2}
                        blurOnSubmit
                    />

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" color={colors.accent} onPress={onResetButtonClick} />
                        </View>

                        <View style={styles.button}>
                            <Button title="Confirm" color={colors.primary} onPress={onConfirmButtonClick} />
                        </View>
                    </View>
                </Card>

                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
    },
    button: {
        minWidth: 100,
    },
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
