import {
  BIT_COIN_PRICE,
  GITHUB_PROFILE,
  GET_PROFILE_ERROR,
  GITHUB_REPOSITORIES

} from '../actions/constants';

const init = {
  newPrice: [],
  loading : true,
  user: null,
  repositories: null,
  error: null
}
export default function(state = init, action){
  switch (action.type) {
    case 'BIT_COIN_PRICE':
      return {...state, newPrice: action.payload, loading:false};
    case 'GITHUB_PROFILE':
      return {...state, user: action.payload }
    case GITHUB_REPOSITORIES:
      return {...state, repositories: action.payload, error: null, loading: false}
    case GET_PROFILE_ERROR:
      return {...state, errror: action.payload}
  }
  return state;

}
