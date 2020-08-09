import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Modal } from 'react-native';

export default function GoalInput(props) {
    const [enteredGoal, setEnteredGoal] = useState('');

    const onInputChangeText = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    const onButtonClick = () => {
        setEnteredGoal('');

        props.onButtonClick(enteredGoal);
    };

    const onCancelClick = () => {
        setEnteredGoal('');

        props.onCancelClick();
    };

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Course goal"
                    style={styles.input}
                    onChangeText={onInputChangeText}
                    value={enteredGoal}
                />

                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Add" onPress={onButtonClick} />
                    </View>

                    <View style={styles.button}>
                        <Button title="Cancel" onPress={onCancelClick} color="red" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
    button: {
        width: '40%',
    }
});
