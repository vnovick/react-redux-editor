import React from 'react';
import { EditorContainer } from 'components/editor';
import { StructureMonitorContainer } from 'components/structureMonitor';
import { StructureToEditorContainer } from 'components/StructureToEditor';
import { GalleryContainer } from 'components/gallery';
import { HtmlContainer } from 'components/htmlContainer';
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
                <div className="editor-container" style={{display:'flex', flexDirection: 'column',  width: '70%'}}>
                  <div className="editor-html" style={{display: 'flex', flexDirection: 'row'}}>
                    <EditorContainer className="card card--z1" store={store} {...props} style={{ width: '50%'}}/>

                  </div>
                  <div className="structure" style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex'}}>
                    <StructureMonitorContainer className="card card--z3" {...props} style={{ width: '40%'}}/>

                  </div>
                </div>
              </div>
            </Provider>
          </div>

        );
    }
}
