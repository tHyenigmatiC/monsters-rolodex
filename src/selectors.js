import { createSelector } from "reselect";

// selector for search field
const selectSearchRobots = state => state.search;
export const selectSearchField = createSelector(
    [selectSearchRobots],
    searchRobots => searchRobots.searchField
);


// selector for getting monsters
const selectRequestMonsters = state => state.monsters;
export const selectMonsters = createSelector(
    [selectRequestMonsters],
    requestMonsters => requestMonsters.monsters
)

