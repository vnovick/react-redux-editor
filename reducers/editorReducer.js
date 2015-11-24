import { Map, List } from 'immutable';
import { editorActionTypes } from 'constants/actionTypes';

const INITIAL_STATE = Map({
    content: Map({blocks: Map({
        textBlock1: {
            content: {
                text: "sdf"
            },
            eventsDelegator: Map({
                newBlockPending: false
            })
        }}
    )})
});


function setState(currentState, newState, blockId) {
    return currentState.updateIn(['content', 'blocks', blockId ], blocks => newState);
}

function addBlockToState(currentState, newState, blockId) {
    return currentState.updateIn(['content', 'blocks'], blocks => blocks.set(blockId, newState));
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
    case editorActionTypes.CONTENT_CHANGE:
        return setState(state, action.state, action.blockId);
    case editorActionTypes.NEW_BLOCK:
        return addBlockToState(state, action.state, action.blockId);
    }
    return state;
}
