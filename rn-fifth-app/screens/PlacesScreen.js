import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Place from "../models/Place";


const PlacesScreen = ({ navigation }) => {
    const places = useSelector((state) => state.places.all);

    return (
        <FlatList
            data={places}
            renderItem={(item) => (
                <Place
                    data={item}
                    onPress={() => navigation.navigate('Place', {data: item})}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({

});

export default PlacesScreen;
