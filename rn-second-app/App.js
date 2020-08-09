import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import {AppLoading} from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [selectedNumber, setSelectedNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(error) => console.error(error)}
            />
        );
    }

    const onStartGamePress = (selectedNumber) => {
        setSelectedNumber(selectedNumber);

        setGuessRounds(0);
    };

    const onGameOver = (roundsNumber) => {
        setGuessRounds(roundsNumber);
    };

    const onRestartPress = () => {
        setSelectedNumber(null);
        setGuessRounds(0);
    };

    let screen = <StartGameScreen onStartGamePressed={onStartGamePress} />;

    if (selectedNumber && guessRounds <= 0) {
        screen = <GameScreen userChoice={selectedNumber} onGameOver={onGameOver} />
    } else if (guessRounds > 0) {
        screen = <GameOverScreen guessRounds={guessRounds} userNumber={selectedNumber} onRestartPress={onRestartPress} />
    }

    return (
        <View style={styles.screen}>
            <Header title="Guess a number" />

            {screen}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
