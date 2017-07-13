import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';

import {fetchBitCoinPrice, getGithubProfile, getAllRepositories, fetchRepositoryDetails} from '../actions/index';

class LandingPage extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    };
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

  createMap(commit){
    console.log(commit.commit.author.name);

    //todo
    // if(!this.state.data.includes(commit.commit.author.name)){
    //   let arr = this.state.data.slice();
    //   arr.push({
    //     'aaa' : 1
    //   });
    //   this.setState({data : arr});
    // }
    //   console.log(this.state.data);

  }


  renderGraph(commits){
    if(commits != null)
    commits.map(this.createMap.bind(this));
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
          {this.renderGraph(this.props.repo_commits)}
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    loading : state.github.loading,
    user: state.github.user,
    error: state.github.error,
    repositories: state.github.repositories,
    repo_commits: state.github.repository_commits
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getGithubProfile: getGithubProfile, getAllRepositories: getAllRepositories, fetchRepositoryDetails: fetchRepositoryDetails}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
