import Place from "../../models/Place";
import { ADD_PLACE, SET_PLACES } from "../actions/place";

const initialState = {
    all: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            state.all.push(
                new Place(
                    action.id.toString(),
                    action.title,
                    action.image,
                    action.address,
                    action.location.latitude,
                    action.location.longitude,
                )
            );
            break;

        case SET_PLACES:
            state.all = action.places.map(
                (rawPlace) => new Place(
                    rawPlace.id.toString(),
                    rawPlace.title,
                    rawPlace.image,
                    rawPlace.address,
                    rawPlace.latitude,
                    rawPlace.longitude,
                )
            );
            break;
    }

    return {
        ...state,
        all: [...state.all],
    };
};
