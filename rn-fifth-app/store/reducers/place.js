import Place from "../../models/Place";
import { ADD_PLACE } from "../actions/place";

const initialState = {
    places: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            state.places.push(
                new Place(
                    new Date().toString(),
                    action.title
                )
            );
            break;
    }

    return {
        ...state,
        places: [...state.places],
    };
};
