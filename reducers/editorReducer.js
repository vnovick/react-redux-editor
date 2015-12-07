import { Map, List} from 'immutable';
import { editorActionTypes } from 'constants/actionTypes';
const INITIAL_STATE = Map({
    content: Map({blocks: List()})
});

function changeContent(currentState, newState) {
    return currentState.updateIn(['content', 'blocks'], blocks => blocks.merge(newState));
}

function setEditorState(currentState, newState) {
    return currentState.merge(newState);
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case editorActionTypes.EDITOR_SET_STATE:
        return setEditorState(state, action.state)
    case editorActionTypes.EDITOR_CONTENT_CHANGE:
        return changeContent(state, action.state);
    case editorActionTypes.EDITOR_IMAGE_INSERT:
        return changeContent(state, action.state)
    }
    return state;
}
