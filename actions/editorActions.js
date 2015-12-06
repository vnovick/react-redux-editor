import { editorActionTypes } from 'constants/actionTypes';
import { parse } from 'markdown-to-ast';
import { Map } from 'immutable';
export const editorDropAction = (store, element, container) => {
    if (element.className === 'dropContainer') {
        let splitedBlock = container.innerHTML.split(element.outerHTML)
        let blockId = container.parentElement.parentElement.id;
        updateSplitedContent(store, splitedBlock[0], blockId);
        container.innerHTML = splitedBlock[0];
        splitedBlock.shift();
        let splitedContent = splitedBlock.join(element.outerHTML)
        store.dispatch({
            type: editorActionTypes.EDITOR_SPLIT_CONTENT,
            state: Map({
                splitedContent,
            })
        })
        let currentControls = store.getState().editor.getIn(['content', 'blocks', blockId, 'getControls'])();
        newImageBlock(currentControls);
        newTextBlock(currentControls);

    }
}

export const setEditorState = (store, state) => {
    store.dispatch({
        type: editorActionTypes.EDITOR_SET_STATE,
        state
    })
}

export const newTextBlock = (controls) => {
    if (!controls){
        window.SirTrevor.block_controls.$el.children('a.st-block-control[data-type="text"]').click();
    } else {
        controls.text.click();
    }
}

export const newImageBlock = (controls) => {
    controls.image.click();
}

export const updateSplitedContent = (store, content, blockId) => {
    let parsedContent = parse(content);
    store.dispatch({
        type: editorActionTypes.EDITOR_CONTENT_CHANGE,
        state: Map({
            content: Map({
                text: parsedContent
            }),
            status: 'changed'
        }),
        blockId: blockId
    });
}

export const contentUpdate = (store, content, blockId) => {
    Array.from(content.children).map( element => {
        element.className = "";
    })
    let parsedContent = parse(store.getState().editor.getIn(['editor', 'instance']).toMarkdown(content.innerHTML));
    store.dispatch({
        type: editorActionTypes.EDITOR_CONTENT_CHANGE,
        state: Map({
            content: Map({
                text: parsedContent
            }),
            status: 'changed'
        }),
        blockId: blockId
    });
};

function attachCustomListenes(store, trevorEvent){
    trevorEvent.text_block.bind('blur keyup paste copy cut', (e) => {
        contentUpdate(store, e.target, trevorEvent.blockID)
    });
    trevorEvent.text_block.keyup(function (e){
        if(+e.target.dataset.prevCarretPosition === 0 && e.keyCode === 8){
            deleteBlock(store, trevorEvent);
        }
    })
    trevorEvent.text_block.keydown(function (e){
        let carretPosition = window.getSelection().anchorOffset;
        e.target.dataset.prevCarretPosition = e.target.dataset.prevCarretPosition !== carretPosition ? carretPosition : e.target.dataset.prevCarretPosition;
    })
}

export const deleteBlock = (store, block) => {
  console.log(block)
}

export const newBlock = (store, trevorEvent) => {
    attachCustomListenes(store, trevorEvent);
    let block = trevorEvent.$el;
    store.dispatch({
        type: editorActionTypes.EDITOR_NEW_BLOCK,
        state: Map({
            content: Map(trevorEvent.blockContent),
            status: 'new',
            getControls:  () => {
                block.addClass('st-block--with-plus').click();
                return Array.from(block.children('.st-block-controls')
                  .removeClass('st-block-controls--active')
                  .children('a'))
                  .reduce((prev, next) => {
                      return {...prev, ...{[next.dataset.type]: next}}
                  }, {})
            },
            type: trevorEvent.blockStorage.type,
            block: trevorEvent.$editor,
            blockId: trevorEvent.blockID
        }),
        blockId: trevorEvent.blockID
    });
};
