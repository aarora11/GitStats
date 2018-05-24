import {
  GITHUB_PROFILE,
  GET_PROFILE_ERROR,
  GITHUB_REPOSITORIES

} from '../actions/constants';

const init = {
  newPrice: [],
  loading : true,
  user: null,
  repositories: null,
  error: null,
  selectedRepo: null
}
export default function(state = init, action){
  switch (action.type) {
    case 'GITHUB_PROFILE':
      return {...state, user: action.payload }
    case GITHUB_REPOSITORIES:
      return {...state, repositories: action.payload, error: null, loading: false}
    case GET_PROFILE_ERROR:
      return {...state, errror: action.payload}
  }
  return state;

}
