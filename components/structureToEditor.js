import React from 'react';
import {connect} from 'react-redux';
import Quill from 'quill';

export const StructureToEditor = class Editor extends React.Component {
    componentDidMount(){
        let editor = new Quill('#structureToEditor');
        window.editor2 = editor;
    }

    setContent(content){
        if (window.editor2) {
            window.editor2.setContents(content.map( block => {
                return {
                    insert: block.insert ? block.insert : block.paragraphs.join('\n'), attributes: block.attributes
                }
            }))
        }
    }
    render() {
        this.setContent(this.props.content.blocks)
        return (
          <aside className={this.props.className} style={this.props.style}>
            <h1 className="title">Structure To Editor</h1>
            <div id="structureToEditor" style={{ border: '1px dashed', backgroundColor: 'rgba(1,255,1,.2)'}}></div>
          </aside>
        )
    }
};

function mapStateToProps(state){
    return {
        content: state.editor.get('content').toJS()
    };
}

export const StructureToEditorContainer = connect(mapStateToProps)(StructureToEditor);
