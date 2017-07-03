import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBitCoinPrice, getGithubProfile} from '../actions/index';


class LandingPage extends Component {

  constructor() {
    super();
  }


  componentWillMount() {
    this.props.getBitCoinPrice();
    this.props.getGithubProfile();
    this.interval = setInterval(this.props.getBitCoinPrice, 10000);
  }

  renderBitCoinPrice(newPrice) {
    return (
      <div>
        <p>Price :{newPrice.symbol}{newPrice.buy}</p>
        <p>15m :{newPrice.symbol}{newPrice["15m"]}</p>
        <p>Sell :{newPrice.symbol}{newPrice.sell}</p>
      </div>
    );
  }

  render() {

    if(this.props.loading){
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div>
          {this.renderBitCoinPrice(this.props.newPrice)}
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    newPrice: state.coin.newPrice,
    loading : state.coin.loading,
    user: state.coin.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getBitCoinPrice: fetchBitCoinPrice ,getGithubProfile: getGithubProfile}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
