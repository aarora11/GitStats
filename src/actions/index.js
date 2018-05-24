import axios from 'axios';
import {
  GITHUB_PROFILE,
  GITHUB_PROFILE_URL,
  GET_PROFILE_ERROR,
  GITHUB_REPOSITORIES,
  GITHUB_TOKEN

} from './constants';


export function getGithubProfile() {
  return function (dispatch) {
    return axios({
      method: 'GET',
      url: GITHUB_PROFILE_URL
    }).then(response => {
      dispatch(getGithubProfiles(response));
    }).catch(error => {
      console.log(error);
      dispatch(getProfileError(error));
    });
  }
}

export function getAllRepositories() {
  return function (dispatch) {
    return axios({
      method: 'GET',
      url: 'https://api.github.com/users/aarora11/repos',
      headers: {
        Authorization: 'token ' + GITHUB_TOKEN
      }
    }).then(response => {
      dispatch(getRepositories(response));
    }).catch(error => {
      console.log(error);
    });
  }
}

export function getRepositoryDetails(value) {
  let url = 'https://api.github.com/repos/aarora11/' + value + '/commits';
  // console.log(value, url);
  return function (dispatch) {
    return axios({
      method: 'GET',
      url,
      headers: {
        Authorization: 'token ' + GITHUB_TOKEN
      }
    }).then(response => {
      //TODO dispatch action to display the repostiory commit details
      let payload = createPayload(response);
      console.log(payload);
    }).catch(error => {
      console.log(error);
    });
  }
}

function getRepositories(response) {
  return {
    type: GITHUB_REPOSITORIES,
    payload: response.data
  }
}


function getGithubProfiles(payload) {
  return {
    type: GITHUB_PROFILE,
    payload: payload.data
  }
}



function getProfileError(error) {
  return {
    type: FETCH_ERROR,
    payload: error
  }
}

function createUserMap(response) {
  let usersMap = {};
  let commits = response.data;
  for (let i = 0; i < commits.length; i++) {
    let commit = commits[i];
    if (Object.keys(usersMap).length != 0 && Object.keys(usersMap).includes(commit.author.login)) {
      usersMap[commit.author.login] = usersMap[commit.author.login] + 1;
    } else {
      usersMap[commit.author.login] = 1;
    }
  }
  return usersMap;
}

function createCommitDetails(response) {
  let commitDetails = {};
  let commits = response.data;
  for (let i = 0; i < commits.length; i++) {
    let commit = commits[i];
    if (Object.keys(commitDetails).length != 0 &&
      Object.keys(commitDetails).includes(commit.commit.author['date'].split('T')[0])) {
      commitDetails[commit.commit.author['date'].split('T')[0]] = commitDetails[commit.commit.author['date'].split('T')[0]] + 1;
    } else {
      commitDetails[commit.commit.author['date'].split('T')[0]] = 1;
    }
  }
  return commitDetails;
}

function getKeyByValue(usersMap, key){
  let topCommitter;
  let keys = Object.keys(usersMap);
  for(let i=0; i<Object.keys(usersMap).length;i++){
    if(usersMap[keys[i]] === key){
      topCommitter = keys[i];
    }
  }
  return topCommitter;
}


function createPayload(response) {
  console.log(response);
  /*
   Users will be a map which will figure out all users who have committed to a repository.
   A user vs commit graph will be showcased.
  */
  let usersMap = createUserMap(response);
  /*
  Commit details extracts the commit details from the response.
   */
  let commitDetails = createCommitDetails(response);

  let key = Math.max(Math.max.apply(Math, Object.values(usersMap)));
  let topCommiter = getKeyByValue(usersMap, key);
  /*
  Github hourly limit remaining.
  Unauthenticated : 60 requests/hour
  Authenticated via token : 5000 requests/hour
   */
  let limitRemaining = response.headers['x-ratelimit-remaining'];
  let payload = {
    limitRemaining,
    commitDetails,
    usersMap,
    topCommiter
  };
  return payload;
}