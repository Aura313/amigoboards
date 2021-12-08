import { combineReducers } from 'redux';
import { projectsReducer } from './projects';
import { userReducer } from './user';

// REDUCERS
const reducers = combineReducers({
  allProjects: projectsReducer,
  user: userReducer,
});

export default reducers;