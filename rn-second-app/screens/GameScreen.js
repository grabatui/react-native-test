import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, ScrollView, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card'
import MainButton from '../components/MainButton';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    let result;

    do {
        result = Math.floor(Math.random() * (max - min)) + min;
    } while (exclude === result);

    return result;
};

const callWrongDirectionAlert = () => {
    Alert.alert(
        'Don\'t lie!',
        'You know this is wrong...',
        [
            {text: 'Sorry', 'style': 'cancel'},
        ]
    );
};

const renderListItem = (value, numberOfRound) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{numberOfRound}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    );
};

const GameScreen = (props) => {
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    const createAnotherGuess = (excludeGuess) => {
        return generateRandomBetween(currentMin.current, currentMax.current, excludeGuess);
    };

    const initialGuess = createAnotherGuess(props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses);
        }
    }, [currentGuess, props.userChoice, props.onGameOver]);

    const onButtonPress = (direction) => {
        if (direction !== 'lower' && direction !== 'greater') {
            return;
        }

        switch (direction) {
            case 'lower':
                if (currentGuess < props.userChoice) {
                    callWrongDirectionAlert();

                    return;
                }

                currentMax.current = currentGuess;
                break;

            case 'greater':
                if (currentGuess > props.userChoice) {
                    callWrongDirectionAlert();

                    return;
                }

                currentMin.current = currentGuess + 1;
                break;
        }

        const nextNumber = createAnotherGuess(currentGuess);

        setCurrentGuess(nextNumber);

        setPastGuesses((currentPastGuess) => [
            nextNumber,
            ...currentPastGuess,
        ])
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>

            <NumberContainer>{currentGuess}</NumberContainer>

            <Card style={styles.buttonContainer}>
                <MainButton onPress={onButtonPress.bind(this, 'lower')} style={styles.button}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>

                <MainButton onPress={onButtonPress.bind(this, 'greater')} style={styles.button}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>

            <View style={styles.listWrapper}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: (Dimensions.get('window').height > 600) ? 20 : 5,
        width: 300,
        maxWidth: '80%',
    },
    button: {
        paddingHorizontal: 17,
    },
    listWrapper: {
        flex: 1,
        marginTop: 10,
        width: '80%',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default GameScreen;
