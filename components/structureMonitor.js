import React from 'react';
import {connect} from 'react-redux';

export const StructureMonitor = class Editor extends React.Component {
    render() {
        return (
          <aside className={this.props.className} style={this.props.style}>
            <h1 className="title">Structure Monitor</h1>
            <textarea className="monitor" readOnly value= {JSON.stringify(this.props.content, null, 2) } />
          </aside>
        )
    }
};

function mapStateToProps(state){
    return {
        content: state.editor.get('content').toJS()
    };
}

export const StructureMonitorContainer = connect(mapStateToProps)(StructureMonitor);
