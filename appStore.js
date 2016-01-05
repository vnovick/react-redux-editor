import thunk from 'redux-thunk';
import multi from 'redux-multi';
import { createStore, compose, applyMiddleware, } from 'redux';
import createLogger from 'redux-logger';
import { Map, Iterable } from 'immutable';
import rootReducer from 'reducers/rootReducer';
import sagaMiddleware from 'redux-saga';
import gallerySagas from 'sagas/gallerySagas';
const createComposedStore = compose(
applyMiddleware(
  sagaMiddleware(...gallerySagas),
  thunk,
  createLogger({
      collapsed: true,
      duration: true,
      timestamp: true,
      stateTransformer: (state = Map())=>{
          return Object.assign(Map(state).toJS(), { [Symbol("Immutable State")]: state });
      }
  })
)
// ,window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default createComposedStore(rootReducer);
