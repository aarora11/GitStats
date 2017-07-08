import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';

import {fetchBitCoinPrice, getGithubProfile, getAllRepositories, fetchRepositoryDetails} from '../actions/index';

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

  buttonCLicked(){
    console.log("Clicked");
  }


  renderRepository(repo){
    let name = repo.name;
    return(
      <p key={name}><button onClick={()=> {this.props.fetchRepositoryDetails(name)}} title="Repository">{name}</button></p>
    )
  }

  render() {
    if(this.props.loading){
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      let repositories = this.props.repositories;
      return (
        <div>
          {this.renderUser(this.props.user)}
          {repositories.map(this.renderRepository.bind(this))}
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
  return bindActionCreators({getGithubProfile: getGithubProfile, getAllRepositories: getAllRepositories, fetchRepositoryDetails: fetchRepositoryDetails}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
