import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { searchRobots, requestRobots } from "./reducer";


const rootReducer = combineReducers({
    search: searchRobots,
    monsters: requestRobots 
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);
