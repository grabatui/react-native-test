import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/reducers/place';
import { initDatabase } from './helpers/db'


initDatabase()
    .then(() => {
        console.log('Database successfuly connected');
    })
    .catch((error) => {
        console.log('Database exception');
        console.error(error);
    });


const store = createStore(
    combineReducers({
        places: placesReducer,
    }),
    applyMiddleware(thunk)
);

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
}
