import { Map, List } from 'immutable';
import { galleryActionTypes } from 'constants/actionTypes';

const INITIAL_STATE = Map({
    images: List()
});

function setState(currentState, newState) {
    return currentState.merge(newState);
}

function removeDraggingImage(currentState) {
    return currentState.delete('draggingImage');
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case galleryActionTypes.FETCHED_PHOTOS:
        return setState(state, action.state);
    case galleryActionTypes.DRAG_STARTED:
        return setState(state, action.state);
    case galleryActionTypes.DRAG_END:
        return removeDraggingImage(state, action.state)
    }
    return state;
}
