import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
        };
    },
});

export default function App() {
    const [token, setToken] = useState(null);

    useEffect(
        () => {
            Notifications
                .getPermissionsAsync()
                .then((response) => {
                    if (response.status !== 'granted') {
                        return Notifications.requestPermissionsAsync();
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
                    setToken(response.data);
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
        fetch(
            'https://exp.host/--/api/v2/push/send',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: token,
                    data: {extraData: 'Some data'},
                    title: 'Send via the app',
                    body: 'This push notification was sent via the app!',
                })
            }
        );
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
