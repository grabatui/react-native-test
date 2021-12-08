import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
        };
    },
});

export default function App() {
    useEffect(
        () => {
            Permissions
                .getAsync(Permissions.NOTIFICATIONS)
                .then((response) => {
                    if (response.status === 'granted') {
                        return Permissions.askAsync(Permissions.NOTIFICATIONS);
                    }

                    return response;
                })
                .then((response) => {
                    if (response.status !== 'granted') {
                        throw new Error('Permission denied');
                    }
                })
                .then(() => {
                    return Notifications.getExpoPushTokenAsync();
                })
                .then((response) => {
                    const token = response.data;
                })
                .catch((error) => {
                    return null;
                });
        },
        []
    );

    useEffect(
        () => {
            const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
                (response) => console.log(response)
            );

            const foregroundSubscription = Notifications.addNotificationReceivedListener(
                (notification) => console.log(notification)
            );

            return () => {
                backgroundSubscription.remove();
                foregroundSubscription.remove();
            };
        },
        []
    );

    const triggerNotificationHandler = () => {
        
    };

    return (
        <View style={styles.container}>
            <Button
                title="Trigger notification"
                onPress={triggerNotificationHandler}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
