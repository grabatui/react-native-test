import React from "react";
import { StyleSheet, Button, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch } from "react-redux";

import colors from "../constants/colors";
import { logout } from "../store/actions/auth";


const DrawerLogout = (props) => {
    const dispatch = useDispatch();

    const onLogoutPress = () => {
        dispatch(
            logout()
        );
    };

    return (
        <DrawerContentScrollView style={styles.wrapper} {...props}>
            <DrawerItemList {...props} />

            <Button
                title="Logout"
                color={colors.primary}
                onPress={onLogoutPress}
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 20,
    }
});

export default DrawerLogout;
