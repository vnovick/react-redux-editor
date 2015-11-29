import { newImageBlock } from 'editorActions'
export const dragEnd = (store, event) => {
    console.log(event.target.src)
    // store.dispatch({
    //     type: editorActionTypes.DRAG_END,
    //     state: Map({
    //         content: Map(trevorEvent.blockContent)
    //     }),
    //     blockId: trevorEvent.blockID
    // });
};

export const dragStart = (store, event) => {
    newImageBlock();
    console.log(event.target.src)
    // store.dispatch({
    //     type: editorActionTypes.DRAG_END,
    //     state: Map({
    //         content: Map(trevorEvent.blockContent)
    //     }),
    //     blockId: trevorEvent.blockID
    // });
};
