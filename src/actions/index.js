import axios from 'axios';
import {
  BIT_COIN_PRICE,
  GITHUB_PROFILE
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
  console.log("asdlkfhahskdjf");
  return function (dispatch) {
    return axios({
      method: 'GET',
      url: 'https://api.github.com/users/aarora11'
    }).then(response =>{
      console.log(response);
      dispatch(getGithubProfiles(response));
    }).catch(error =>{
      console.log(error);
    });
  }
}



 function getGithubProfiles(payload) {
  return {
    type : GITHUB_PROFILE,
    payload: payload
  }
}