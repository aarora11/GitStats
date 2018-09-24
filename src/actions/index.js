import axios from 'axios';
import {
  GITHUB_PROFILE,
  GITHUB_PROFILE_URL,
  GET_PROFILE_ERROR,
  GITHUB_REPOSITORIES,
  GITHUB_TOKEN,
  GITHUB_REPOSITORY_DETAILS,
  GITHUB_COMMIT_PER_USER,
  SELECTED_REPOSITORY

} from './constants';

// Adding a response interceptor
const responseInterceptor = axios.interceptors.response.use(function (response) {
  if (response.status === 202) {
    response = axios({
      method: 'GET',
      url: response.config.url,
      headers: {
        Authorization: 'token ' + GITHUB_TOKEN
      }
    }).then(response => {
      return response;
    }).catch(error => {
      console.log(error);
    });
    return response;
  } else {
    return response;
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export function getAllRepositories() {
  return function (dispatch) {
    return axios({
      method: 'GET',
      url: 'https://api.github.com/orgs/FiviumAustralia/repos',
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
  let url = 'https://api.github.com/repos/FiviumAustralia/' + value + '/stats/contributors';
  return function (dispatch) {
    return axios({
      method: 'GET',
      url,
      headers: {
        Authorization: 'token ' + GITHUB_TOKEN
      }
    }).then(response => {
      //TODO dispatch action to display the repostiory commit details
      let payload = commitsPerUser(response.data);
      dispatch(getUserCommitGraph(payload));
    }).catch(error => {
      console.log(error);
    });
  }
}

export function getYearlyCommitActivity(value) {
  let url = 'https://api.github.com/repos/FiviumAustralia/' + value + '/stats/commit_activity';
  return function (dispatch) {
    return axios({
      method: 'GET',
      url,
      headers: {
        Authorization: 'token ' + GITHUB_TOKEN
      }
    }).then(response => {
      let payload = createCommitGraphPayload(response.data);
      dispatch(setSelectedRepository(value));
      dispatch(getGithubRepositoryDetails(payload));
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

function getGithubRepositoryDetails(payload) {
  return {
    type: GITHUB_REPOSITORY_DETAILS,
    payload
  }
}

function getUserCommitGraph(payload) {
  return {
    type: GITHUB_COMMIT_PER_USER,
    payload
  }
}

function setSelectedRepository(payload) {
  return {
    type : SELECTED_REPOSITORY,
    payload
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

function getKeyByValue(usersMap, key) {
  let topCommitter;
  let keys = Object.keys(usersMap);
  for (let i = 0; i < Object.keys(usersMap).length; i++) {
    if (usersMap[keys[i]] === key) {
      topCommitter = keys[i];
    }
  }
  return topCommitter;
}


function createPayload(response, value) {
  // console.log(value);
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
    topCommiter,
    selectedRepository: value
  };
  return payload;
}

function commitsPerUser(data) {
  let numberOfCommitsPerUser = {};
  let maxCommits = 0;
  let topCommiter = '';
  for (let i = 0; i < data.length; i++) {

    numberOfCommitsPerUser[data[i].author['login']] = data[i].total;
    if (data[i].total > maxCommits) {
      maxCommits = data[i].total;
      topCommiter = data[i].author['login'];
    }
  }

  let payload = {
    numberOfCommitsPerUser,
    maxCommits,
    topCommiter
  };
  return payload;
}

function createCommitGraphPayload(data){
  let payload = {};
  data.map(obj => {
    let todayTime = new Date(obj['week'] * 1000);
    let key = todayTime.getDate()+'/'+todayTime.getMonth()+'/'+todayTime.getFullYear()
    payload[key] = obj.total;
  });
  return payload;
}