import * as FileSystem from 'expo-file-system';
import { YMAPS_API_KEY } from '@env'

import { insertPlace, getPlaces } from '../../helpers/db';


export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
    return async (dispatch) => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });

            const geocodeResult = await fetch(
                `https://geocode-maps.yandex.ru/1.x?geocode=${location.latitude},${location.longitude}&apikey=${YMAPS_API_KEY}&sco=latlong&format=json&results=1&lang=en_US`
            );

            const geocodeResultData = await geocodeResult.json();

            if (! geocodeResult.ok) {
                throw new Error('Someting went wrong');
            }

            const address = geocodeResultData.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted;

            const insertResult = await insertPlace(
                title,
                newPath,
                address || '',
                location.latitude,
                location.longitude
            );

            dispatch({
                type: ADD_PLACE,
                id: insertResult.insertId,
                title,
                image: newPath,
                address,
                location,
            });
        } catch (exception) {
            throw exception;
        }
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
