import { combineReducers } from 'redux';
import githubReducer from './githubReducer';
const rootReducer = combineReducers({
  github : githubReducer
});

export default rootReducer;
