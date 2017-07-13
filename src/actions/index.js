import axios from 'axios';
import {
  BIT_COIN_PRICE,
  GITHUB_PROFILE,
  GITHUB_PROFILE_URL,
  GET_PROFILE_ERROR,
  GITHUB_REPOSITORIES,
  GET_ALL_REPOSITORIES,
  FETCH_REPOSITORY_DETAILS,
  GITHUB_REPO_COMMITS
} from './constants';
export const BITCOIN_PRICE = 'bitcoin_price';


export function fetchBitCoinPrice(){
  return function(dispatch){
    return axios({
      method: 'get',
      url: 'https://blockchain.info/ticker',
    }).then(response => {
      dispatch(pushData(response.data.AUD));
    }).catch(error =>{
      console.error(error);
    });
  }
}
function pushData(payload) {
  return{
    type : BIT_COIN_PRICE,
    payload : payload
  }
}

export function getGithubProfile() {
  return function (dispatch) {
    return axios({
      method: 'GET',
      url: GITHUB_PROFILE_URL
    }).then(response =>{
      dispatch(getGithubProfiles(response));
    }).catch(error =>{
      console.log(error);
      dispatch(getProfileError(error));
    });
  }
}

export function getAllRepositories(){
  return function(dispatch){
    return axios({
      method : 'GET',
      url : GET_ALL_REPOSITORIES
    }).then(response => {
      dispatch(getRepositories(response));
    }).catch(error =>{
      console.log(error);
    });
  }
  }

export function fetchRepositoryDetails(name){
  return function(dispatch){
    return axios({
      method: 'GET',
      url: FETCH_REPOSITORY_DETAILS+'/'+name+'/commits'
    }).then(response =>{
      dispatch(getGithubCommits(response))
    }).catch(error=> {
      console.log(error);
    })
  }
}

function getRepositories(response){
  return {
    type : GITHUB_REPOSITORIES,
    payload: response.data
  }
}


 function getGithubProfiles(payload) {
  return {
    type : GITHUB_PROFILE,
    payload: payload.data
  }
}

function getGithubCommits(payload){
  return {
    type: GITHUB_REPO_COMMITS,
    payload: payload.data
  }
}


  function getProfileError(error){
    return {
      type: 'FETCH_ERROR',
      payload : error
    }
  }
