import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form' // Rename the named export to as formReducer to avoid confusion
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});