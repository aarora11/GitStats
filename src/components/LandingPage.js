import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGithubProfile, getAllRepositories, getRepositoryDetails} from '../actions/index';
import {Link} from 'react-router';


class LandingPage extends Component {

  constructor() {
    super();
  }


  componentWillMount() {
    this.props.getGithubProfile();
    this.props.getAllRepositories();
  }

  renderUser(detail) {
    const user = detail.user;
    const repositories = detail.repositories;
    return (
      <div id="profile">
        {user.name} <br/>
        {user.bio}
       Followers: {user.followers}
        <p>Company : <Link to={user.company}>{user.company}</Link></p>
        <div id="navcontainer">
          <ul>
            {
              repositories.map((value) => {
                return (
                  <li key={value.name} className="list">
                    <Link onClick={() => {
                      this.props.getRepositoryDetails(value.name);
                    }}>{value.name}</Link>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  renderRepositoryDetails(selectedRepo) {
    if (selectedRepo == '') {
      return <div className="unselectedRepo">
        <p> Please Select a Repository</p>
      </div>
    } else {
      return (
        <div id='profile'>

        </div>
      );
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div>
          {this.renderUser(this.props.details)}
          {this.renderRepositoryDetails(this.props.selectedRepository)}
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    loading: state.github.loading,
    details: state.github,
    selectedRepository: state.github.selectedRepository
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGithubProfile: getGithubProfile, getAllRepositories: getAllRepositories,
    getRepositoryDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
