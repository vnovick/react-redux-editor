import { Map, List } from 'immutable';
import { galleryActionTypes } from 'constants/actionTypes';

const INITIAL_STATE = Map({
    images: Map({})
});

function setState(currentState, newState) {
    return currentState.updateIn(['images'], _ => newState);
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case galleryActionTypes.FETCH_IMAGES:
        return setState(state, action.state);
    }
    return state;
}
