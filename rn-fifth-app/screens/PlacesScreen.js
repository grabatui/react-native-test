import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Place from "../components/Place";
import { setPlaces } from "../store/actions/place";


const PlacesScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(setPlaces());
        },
        [dispatch]
    );

    const places = useSelector((state) => state.places.all);

    return (
        <FlatList
            data={places}
            renderItem={(item) => (
                <Place
                    data={item}
                    onPress={() => navigation.navigate('Place', {data: item.item})}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({

});

export default PlacesScreen;
