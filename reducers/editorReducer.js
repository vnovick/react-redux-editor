import { Map, List } from 'immutable';
import { editorActionTypes } from 'constants/actionTypes';
import { newTextBlock } from 'actions/editorActions';
const INITIAL_STATE = Map({
    content: Map({blocks: Map()})
});

function changeContent(currentState, newState, blockId) {
    return currentState.updateIn(['content', 'blocks', blockId ], blocks => blocks.merge(newState));
}

function addBlockToState(currentState, newState, blockId) {
    let splitedContent = currentState.get('splitedContent');
    if (typeof splitedContent === 'undefined' || splitedContent.length === 0) {
        return currentState.updateIn(['content', 'blocks'], blocks => blocks.set(blockId, newState));
    }
    else {
        if (newState.get('type') === 'text') {
            newState.get('block').html(currentState.get('splitedContent'));
        }
        currentState.updateIn(['content', 'blocks'], blocks => blocks.set(blockId, newState))
        return currentState;
    }
}

function splitBlock(currentState, newState) {
    return currentState.merge(newState)
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case editorActionTypes.EDITOR_CONTENT_CHANGE:
        return changeContent(state, action.state, action.blockId);
    case editorActionTypes.EDITOR_NEW_BLOCK:
        return addBlockToState(state, action.state, action.blockId);
    case editorActionTypes.EDITOR_SPLIT_CONTENT:
        return splitBlock(state, action.state)
    }
    return state;
}
