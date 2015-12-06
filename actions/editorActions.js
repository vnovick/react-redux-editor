import { editorActionTypes } from 'constants/actionTypes';
export const contentUpdate = (delta, source) => (dispatch, getState) => {
    let state = getState()
    dispatch({
        type: editorActionTypes.EDITOR_CONTENT_CHANGE,
        state: state.editor.get('instance').editor.delta.ops
    })
}

export const newBlock = delta => (dispatch, getState) => {
    let state = getState();
    dispatch({
        type: editorActionTypes.EDITOR_NEW_BLOCK
    })
}

export const setEditorState = (state) => dispatch => dispatch({
    type: editorActionTypes.EDITOR_SET_STATE,
    state
});
