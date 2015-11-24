import { editorActionTypes } from 'constants/actionTypes';
import { Map } from 'immutable';

export const contentUpdate = (store, content, blockId) => {
    let newBlockPending = store.getState().editor.getIn(['content', 'blocks', blockId, 'eventsDelegator', 'newBlockPending' ]);
    store.dispatch({
        type: editorActionTypes.CONTENT_CHANGE,
        state: Map({
            content: Map({
                text: content.replace(/(<\/div>|<div>|<br>)/g, '')
            }),
            eventsDelegator: Map({
                newBlockPending: content.indexOf('<div><br></div>') > 0 ? !newBlockPending : false
            })
        }),
        blockId: blockId
    });
};

export const createNewBlock = (store, content, blockId) => {
    store.dispatch({
        type: editorActionTypes.NEW_BLOCK,
        state: Map({
            content: Map({
                text: content.replace(/(<\/div>|<div>|<br>)/g, '')
            })
        }),
        blockId: `textBlock${+blockId.substr(blockId.length - 1, 1) + 1}`
    })
}
