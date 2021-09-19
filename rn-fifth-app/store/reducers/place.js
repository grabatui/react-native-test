import Place from "../../models/Place";
import { ADD_PLACE } from "../actions/place";

const initialState = {
    all: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            state.all.push(
                new Place(
                    new Date().toString(),
                    action.title
                )
            );
            break;
    }

    return {
        ...state,
        all: [...state.all],
    };
};
