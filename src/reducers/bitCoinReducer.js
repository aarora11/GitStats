import {
  BIT_COIN_PRICE,
  GITHUB_PROFILE
} from '../actions/constants';

const init = {
  newPrice: [],
  loading : true,
  user: null
}
export default function(state = init, action){
  switch (action.type) {
    case 'BIT_COIN_PRICE':
      return {...state, newPrice: action.payload, loading:false};
    case 'GITHUB_PROFILE':
      return {...state, user: action.payload }

  }
  return state;
}