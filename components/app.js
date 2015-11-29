import React from 'react';
import { EditorContainer } from 'components/editor';
import { StructureMonitorContainer } from 'components/structureMonitor';
import { GalleryContainer } from 'components/gallery';
import { Provider} from 'react-redux';
require('styles/app')
export default class App extends React.Component {
    render() {
        let props, { store } = this.props;
        return (
          <div className="app">
            <Provider store={ store }>
              <div className="app__container">
                <GalleryContainer className="card card--z1" store={store} {...props }/>
                <EditorContainer className="card card--z1" store={store} {...props} />
                <StructureMonitorContainer className="card card--z3" {...props} />
              </div>
            </Provider>
          </div>

        );
    }
}
