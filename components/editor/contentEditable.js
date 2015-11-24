import React from 'react';
import ReactDOM from 'react-dom'
export default class ContentEditable extends React.Component {
    render(){
        return <div ref={`${this.props.blockId}EditorBlockContenteditable`}
            onInput={this.emitChange.bind(this)}
            onBlur={this.emitChange.bind(this)}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    }
    shouldComponentUpdate(nextProps){
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    componentDidMount(){
        ReactDOM.findDOMNode(this).focus();
    }
    emitChange(){
        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {

            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
}
