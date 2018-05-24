import { combineReducers } from 'redux';
import GitHubReducer from './githubReducer';
const rootReducer = combineReducers({
  github : GitHubReducer
});

export default rootReducer;
