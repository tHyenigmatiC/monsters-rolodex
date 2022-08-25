import { apiCall } from './api/api';

import {
    CHANGE_SEARCH_FIELD,
    REQUEST_MONSTERS_STARTED,
    REQUEST_MONSTERS_COMPLETED,
    REQUEST_MONSTER_ERROR
} from './constants';

export const setSearchField = (text) => ({ type: CHANGE_SEARCH_FIELD, payload: text});


export const searchRobots = (dispatch) => {
    dispatch({ type: REQUEST_MONSTERS_STARTED });
    apiCall('https://jsonplaceholder.typicode.com/users')
       .then(data => dispatch({ type: REQUEST_MONSTERS_COMPLETED, payload: data }))
       .catch(error => dispatch({ type: REQUEST_MONSTER_ERROR , payload: error }));
}