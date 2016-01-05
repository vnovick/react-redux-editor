import { galleryActionTypes,  } from 'constants/actionTypes';
import { fromJS, Map, List } from 'immutable';

export const dragEnd = (store, event) => {
    store.getState().app.getIn(['editor', 'editorClass']).block_manager.blocks.map( block => {
        Array.from(block.$editor[0].children)
            .map( element => {
                element.className = "";
            })
    })
    store.dispatch({
        type: galleryActionTypes.DRAG_END
    });
};

export const triggerPhotoFetch = () => {
    return {
        type: galleryActionTypes.FETCH_SAMPLE_PHOTOS,
        url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9c9eae39c313d2592de0698e6caa7a83&format=json&nojsoncallback=1&text=football&extras=url_s&per_page=5'
    }
}


export const dragStart = (store, image) => {
    let listenersArray = [];
    store.getState().app.getIn(['editor', 'editorClass']).block_manager.blocks.map( block => {
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
