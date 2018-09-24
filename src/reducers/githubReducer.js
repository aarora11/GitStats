import {
  GITHUB_PROFILE,
  GET_PROFILE_ERROR,
  GITHUB_REPOSITORIES,
  GITHUB_REPOSITORY_DETAILS,
  GITHUB_COMMIT_PER_USER,
  SELECTED_REPOSITORY
} from "../actions/constants";

const init = {
  newPrice: [],
  loading: true,
  user: null,
  repositories: [],
  error: null,
  selectedRepository: "",
  topCommiter: "",
  usersMap: {},
  commitDetails: {},
  commitPerUser : {},
  repositoryYearlyCommitHistory : {}
};
export default function(state = init, action) {
  switch (action.type) {
    case GITHUB_PROFILE:
      return { ...state, user: action.payload };
    case GITHUB_REPOSITORIES:
      return {
        ...state,
        repositories: action.payload,
        error: null,
        loading: false
      };
    case GITHUB_REPOSITORY_DETAILS:
      return {
        ...state,
        repositoryYearlyCommitHistory: action.payload
      };
    case GITHUB_COMMIT_PER_USER:
      return { ...state, commitPerUser: action.payload.numberOfCommitsPerUser, topCommiter: action.payload.topCommiter };
    case SELECTED_REPOSITORY:
      return {...state, selectedRepository: action.payload};
    case GET_PROFILE_ERROR:
      return { ...state, errror: action.payload };
  }
  return state;
}
