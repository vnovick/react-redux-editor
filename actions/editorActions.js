// import { editorActionTypes } from 'constants/actionTypes';
// export const contentUpdate = (delta, source) => (dispatch, getState) => {
//     let editorInstance = getState().editor.get('instance'),
//         isImageInsert = delta.ops.reduce((next, current) => { return !!current.attributes || next }, false);
//     if (isImageInsert && editorInstance.editor.innerHTML.includes("draggable-image")) {
//         editorInstance.setHTML(editorInstance.editor.innerHTML.replace('class="draggable-image"', "").replace("data-reactid", "prev-data-reactid") + "<br/>");
//     }
//     dispatch({
//         type: editorActionTypes.EDITOR_CONTENT_CHANGE,
//         state: editorInstance.editor.delta.ops.map( block => {
//             return typeof block.insert !== "number" ? { paragraphs: block.insert.split(/\n/g).map( text => {
//                 return { html: `${text}` }
//             }), attributes: block.attributes} : block;
//         })
//     })
// }
//
// export const pasteContent = (pastedContent) => dispatch => dispatch({
//     type: editorActionTypes.EDITOR_PASTE_CONTENT
// })
//
// export const setEditorState = (state) => dispatch => dispatch({
//     type: editorActionTypes.EDITOR_SET_STATE,
//     state
// });



////////
import { editorActionTypes } from 'constants/actionTypes';
export const contentUpdate = (delta, source) => (dispatch, getState) => {
    let editorInstance = getState().editor.get('instance'),
        isImageInsert = delta.ops.reduce((next, current) => { return !!current.attributes || next }, false);
    if (isImageInsert && editorInstance.editor.innerHTML.includes("draggable-image")) {
        editorInstance.setHTML(editorInstance.editor.innerHTML.replace('class="draggable-image"', "").replace("data-reactid", "prev-data-reactid") + "<br/>");
    }

    let reducedBlock = editorInstance.editor.delta.ops.reduce( (prev, block) => {
        return [...prev, ...block.insert.split(/\n/g).map( ins => {
            return { text: ins, attributes: block.attributes }
        })]
    }, []).reduce( (prev, next, index, array) => {
        if (!next.attributes){
            return [ ...prev, next ]
        }
      else {
            let prevArray = prev;
            let lastElement = prevArray.pop();
            return [
                ...prevArray, {
                    ...lastElement,
                    ...{
                        span: {
                            text: next.text,
                            attributes: next.attributes
                        },
                        type: 'nested'
                    }
                }
            ]
        }
    }, []);



    dispatch({
        type: editorActionTypes.EDITOR_CONTENT_CHANGE,
        state: {
            paragraphs: reducedBlock
        }
    })
}

export const pasteContent = (pastedContent) => dispatch => dispatch({
    type: editorActionTypes.EDITOR_PASTE_CONTENT
})

export const setEditorState = (state) => dispatch => dispatch({
    type: editorActionTypes.EDITOR_SET_STATE,
    state
});
