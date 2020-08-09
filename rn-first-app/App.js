import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput';

export default function App() {
    const [goals, setGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const onButtonClick = (goal) => {
        setGoals((state) => {
            return [
                ...state,
                {
                    key: Math.random().toString(),
                    value: goal,
                },
            ];
        });

        setIsAddMode(false);
    };

    const onGoalClick = (goalId) => {
        setGoals((state) => {
            return state.filter((goal) => goal.key !== goalId);
        })
    };

    return (
        <View style={styles.screen}>
            <View style={styles.addButton}>
                <Button title="Add new one" onPress={() => setIsAddMode(true)} />
            </View>

            <GoalInput visible={isAddMode} onButtonClick={onButtonClick} onCancelClick={() => setIsAddMode(false)} />

            <FlatList data={goals} renderItem={(goal) => (
                <GoalItem id={goal.item.key} value={goal.item.value} onDelete={onGoalClick} />
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    addButton: {
        marginBottom: 10,
    }
});
