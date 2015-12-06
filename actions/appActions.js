import { appActionTypes } from 'constants/actionTypes';
import { Map } from 'immutable'

export const setState = (store, state) => {
    store.dispatch({
        type: appActionTypes.SET_STATE,
        state
    });
};
