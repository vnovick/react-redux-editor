import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { blockTypes } from 'constants/editorConstants';
import { contentUpdate, createNewBlock } from 'actions/editorActions';
import { EditorUiPanel } from 'editor/EditorUiPanel';
import { EditorBlock } from 'editor/EditorBlock';



export const Editor = class Editor extends React.Component {
    get editorActions() {
        return {
            onChange: (e, blockId)=>{
                let html = ReactDOM.findDOMNode(this.refs[blockId]).innerHTML;
                let newBlockPending = this.props.store.getState().editor.getIn(['content', 'blocks', blockId, 'eventsDelegator', 'newBlockPending' ]);
                if (newBlockPending) {
                    this.editorActions.newBlock(this.props.store, html.split('<div><br></div>').pop(), blockId)
                    ReactDOM.findDOMNode(this.refs[blockId]).innerHTML = html.replace('<div><br></div>', '');
                }
                contentUpdate(this.props.store, html, blockId);
            },

            newBlock: (...args)=>{
                createNewBlock(...args)
            }
        }
    }
    getContentPanesForEachBlock(){
        return this.props.blocks.map((data, id)=>{
            return <EditorBlock ref={id} actions={this.editorActions} type={blockTypes.text} className={id} identifier={id} key={id} content={data.text} store={this.props.store}/>
        }).toList();
    }

    render() {
        return (
          <section className={this.props.className}>
            <h1 className="title">In House Editor</h1>
            <EditorUiPanel ref="uiPanel"></EditorUiPanel>
            {this.getContentPanesForEachBlock()}
          </section>
        )
    }
};

function mapStateToProps(state){
    return {
        blocks: state.editor.getIn(['content', 'blocks'])
    };
}

export const EditorContainer = connect(mapStateToProps)(Editor);
