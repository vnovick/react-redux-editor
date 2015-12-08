import thunk from 'redux-thunk';
import multi from 'redux-multi';
import { createStore, compose, applyMiddleware, } from 'redux';
import createLogger from 'redux-logger';
import { Map, Iterable } from 'immutable';
import rootReducer from 'reducers/rootReducer';

const createComposedStore = compose(
applyMiddleware(thunk, createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
    transformer: (state = Map())=>{
        return Object.assign(Map(state).toJS(), { [Symbol("Immutable State")]: state });
    }
}))
// ,window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default createComposedStore(rootReducer);
