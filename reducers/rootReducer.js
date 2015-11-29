import { combineReducers } from 'redux';
import app from './appReducer';
import monitor from './structureMonitorReducer';
import editor from './editorReducer';
import gallery from './galleryReducer';

const rootReducer = combineReducers({
    app,
    gallery,
    editor,
    monitor
});
export default rootReducer;
