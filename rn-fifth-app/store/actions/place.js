import * as FileSystem from 'expo-file-system';

import { insertPlace, getPlaces } from '../../helpers/db';


export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
    return async (dispatch) => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });

            const insertResult = await insertPlace(title, newPath, 'Address', 0.0, 0.0);
        } catch (exception) {
            throw exception;
        }

        dispatch({
            type: ADD_PLACE,
            id: insertResult.insertId,
            title,
            image: newPath,
        });
    };
};

export const setPlaces = () => {
    return async (dispatch) => {
        let places = [];

        try {
            const getResult = await getPlaces();

            places = getResult.rows._array;
        } catch (exception) {
            throw exception;
        }

        dispatch({
            type: SET_PLACES,
            places: places
        });
    };
};
