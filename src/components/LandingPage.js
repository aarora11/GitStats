import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBitCoinPrice, getGithubProfile, getAllRepositories} from '../actions/index';


class LandingPage extends Component {

  constructor() {
    super();
  }


  componentWillMount() {
    this.props.getGithubProfile();
    this.props.getAllRepositories();
  }


  renderUser(user) {
    return (
      <div>
        <p>{user.name}</p>
        <p>{user.bio}</p>
        <p>Followers: {user.followers}</p>
        <p>Company: {user.company}</p>
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
          {this.renderUser(this.props.user)}
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    loading : state.coin.loading,
    user: state.coin.user,
    error: state.coin.error,
    repositories: state.coin.repositories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getGithubProfile: getGithubProfile, getAllRepositories: getAllRepositories}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
