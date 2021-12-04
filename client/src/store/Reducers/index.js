import { combineReducers } from "redux";
import { projectsReducer } from './projects';

const reducers = combineReducers({
    allProjects : projectsReducer,
});

export default reducers;