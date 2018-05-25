import {
  GITHUB_PROFILE,
  GET_PROFILE_ERROR,
  GITHUB_REPOSITORIES,
  GITHUB_REPOSITORY_DETAILS

} from '../actions/constants';

const init = {
  newPrice: [],
  loading: true,
  user: null,
  repositories: null,
  error: null,
  selectedRepository: '',
  topCommiter: '',
  usersMap: {},
  commitDetails: {},
}
export default function (state = init, action) {
  switch (action.type) {
    case GITHUB_PROFILE:
      return {...state, user: action.payload};
    case GITHUB_REPOSITORIES:
      return {...state, repositories: action.payload, error: null, loading: false};
    case GITHUB_REPOSITORY_DETAILS:
      console.log('ghere', action.payload.selectedRepository);
      return {
        ...state, topCommiter: action.payload.topCommiter,
        usersMap: action.payload.usersMap, commitDetails: action.payload.commitDetails,
        selectedRepository: action.payload.selectedRepository
      };
    case GET_PROFILE_ERROR:
      return {...state, errror: action.payload};
  }
  return state;

}
