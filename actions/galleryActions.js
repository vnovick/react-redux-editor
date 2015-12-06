import { galleryActionTypes,  } from 'constants/actionTypes';
import { fromJS, Map, List } from 'immutable';
export const dragEnd = (store, event) => {
    store.getState().editor.getIn(['editor', 'editorClass']).block_manager.blocks.map( block => {
        Array.from(block.$editor[0].children)
            .map( element => {
                element.className = "";
            })
    })
    store.dispatch({
        type: galleryActionTypes.DRAG_END
    });
};

export const updateGalleryImageList = (store, results) => {
    store.dispatch({
        type: galleryActionTypes.UPDATE_GALLERY_IMAGE_LIST,
        state: Map({
            images: fromJS(results)
        })
    })
}

export const dragStart = (store, image) => {
    let listenersArray = [];
    store.getState().editor.getIn(['editor', 'editorClass']).block_manager.blocks.map( block => {
        Array.from(block.$editor[0].children)
            .filter( element => element.textContent.length === 0 )
            .map( element => {
                element.className = "dropContainer";
            })
    })
    store.dispatch({
        type: galleryActionTypes.DRAG_STARTED,
        state: Map({
            draggingImage: image,
            listenersArray: List(listenersArray)
        })
    })
};
