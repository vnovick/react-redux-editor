import React from 'react';
import {connect} from 'react-redux';
import { newBlock, contentUpdate, setEditorState } from 'actions/editorActions';
import Quill from 'quill';
export const Editor = class Editor extends React.Component {

    componentDidMount(){
        let { dispatch } = this.props;
        let editor = new Quill('#editor');
        window.editor = editor;
        dispatch(setEditorState({
            instance: editor
        }))
        editor.on('text-change', (delta, source)=>{
            dispatch(contentUpdate(delta));
        });
    }


    render() {
        return (
          <section className={this.props.className}>
            <h1 className="title">Quill Editor</h1>
            <div ref="editor" id="editor"/>
          </section>
        )
    }
};

function mapStateToProps(state){
    return {
        actions: state.app.getIn(['editor', 'actions'])
    };
}

export const EditorContainer = connect(mapStateToProps)(Editor);
