import _ from 'lodash'; // Loadash library to help use the omit method to remove or delete
import { 
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

// In state = {} the '{}' is an object
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            // ...state is a new object with current properties
            // mapKeys takes the list of stream and the key will be id
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_STREAM:
            // ...state takes all the property and add it to a new object
            // [action.payload.id] is the key object and action.payload is the value
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            // ID not required as payload is the ID itself
            return _.omit(state, action.payload );
        default: 
            return state;
    }
};