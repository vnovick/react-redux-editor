import { editorActionTypes } from 'constants/actionTypes';
import { parse } from 'markdown-to-ast';
import { Map } from 'immutable';

export const newTextBlock = _ => {
    window.SirTrevor.block_controls.$el.children('a.st-block-control[data-type="text"]').click();
}

export const newImageBlock = _ => {
    window.SirTrevor.block_controls.$el.children('a.st-block-control[data-type="image"]').click();
}

export const contentUpdate = (store, content, blockId) => {
    store.dispatch({
        type: editorActionTypes.CONTENT_CHANGE,
        state: Map({
            content: Map({
                text: content
            })
        }),
        blockId: blockId
    });
};

function attachCustomListenes(store, trevorEvent){
    trevorEvent.text_block.bind('blur keyup paste copy cut', (e) => {
        contentUpdate(store, parse(window.ST.toMarkdown(e.target.innerHTML)), trevorEvent.blockID)
    });
    trevorEvent.text_block.keyup(function (e){
        if(+e.target.dataset.prevCarretPosition === 0 && e.keyCode === 8){
            deleteBlock(trevorEvent, blockID);
        }
    })
    trevorEvent.text_block.keydown(function (e){
        let carretPosition = window.getSelection().anchorOffset;
        e.target.dataset.prevCarretPosition = e.target.dataset.prevCarretPosition !== carretPosition ? carretPosition : e.target.dataset.prevCarretPosition;
    })
}

export const deleteBlock = (store, trevorEvent) => {}

export const newBlock = (store, trevorEvent) => {
    attachCustomListenes(store, trevorEvent);
    console.log(trevorEvent)
    store.dispatch({
        type: editorActionTypes.NEW_BLOCK,
        state: Map({
            content: Map(trevorEvent.blockContent)
        }),
        blockId: trevorEvent.blockID
    });
};
