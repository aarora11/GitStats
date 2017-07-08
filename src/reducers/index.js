import { combineReducers } from 'redux';
import bitCoinReducer from './bitCoinReducer';
const rootReducer = combineReducers({
  coin : bitCoinReducer
});

export default rootReducer;
