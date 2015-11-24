import React from 'react';
import {connect} from 'react-redux';

export const EditorUiPanel = class EditorUiPanel extends React.Component {

    render() {
        return (
          <div className={this.props.className}>
              Here will go Ui
          </div>
        )
    }
};
