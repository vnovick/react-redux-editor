import React from 'react';
import ReactDOM from 'react-dom';
import ContentEditable from 'contentEditable';

export const EditorBlock = class EditorBlock extends React.Component {
    onChange(event){
        this.props.actions.onChange(event, this.props.identifier)
    }
    render() {
        return (
          <ContentEditable ref={`${this.props.identifier}EditorBlock`}
              blockId={this.props.identifier}
              onChange={this.onChange.bind(this)}
              className={this.props.className}
              html={this.props.content}/>
        )
    }
};
