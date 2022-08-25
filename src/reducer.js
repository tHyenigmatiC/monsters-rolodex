import {
    CHANGE_SEARCH_FIELD,
    REQUEST_MONSTERS_STARTED,
    REQUEST_MONSTERS_COMPLETED,
    REQUEST_MONSTER_ERROR
} from './constants';

const INITIAL_SEARCH_FIELD = {
    searchField: ''
}

export const searchRobots = ( state = INITIAL_SEARCH_FIELD, action) => {
    switch( action.type ){
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, { searchField: action.payload});
        default:
            return state;
    }
}

const INITIAL_MONSTERS_STATE = {
    monsters: [],
    isLoading: true,
    error: undefined
};

export const requestRobots = ( state = INITIAL_MONSTERS_STATE, action) => {
    switch( action.type ){
        case REQUEST_MONSTERS_STARTED:
            return Object.assign({} , state, { isLoading: true});
        case REQUEST_MONSTERS_COMPLETED:
            return Object.assign({}, state, { monsters: action.payload, isLoading: false});
        case REQUEST_MONSTER_ERROR:
            return Object.assign({} , state, {  isLoading: false, error: action.payload });
        default:
            return state;
    }
}