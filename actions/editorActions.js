import { editorActionTypes } from 'constants/actionTypes';
export const contentUpdate = (delta, source) => (dispatch, getState) => {
    let editorInstance = getState().editor.get('instance'),
        isImageInsert = delta.ops.reduce((next, current) => { return !!current.attributes || next }, false);
    if (isImageInsert) {
        editorInstance.setHTML(editorInstance.editor.innerHTML.replace('class="draggable-image"', "").replace("data-reactid", "prev-data-reactid"));

    }
    dispatch({
        type: editorActionTypes.EDITOR_CONTENT_CHANGE,
        state: editorInstance.editor.delta.ops.map( block => { return typeof block.insert !== "number" ? {insert: block.insert.split(/\n{2,}/g)} : block; })
    })
}

export const setEditorState = (state) => dispatch => dispatch({
    type: editorActionTypes.EDITOR_SET_STATE,
    state
});
