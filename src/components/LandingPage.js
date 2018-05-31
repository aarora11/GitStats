import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGithubProfile, getAllRepositories, getRepositoryDetails} from '../actions/index';
import UserDetailsChart from './UserDetailsChart';
import CommitDetailsChart from './CommitDetailsChart';
import LanguageDetailsChart from './LanguageDetailsChart';
import RepositoryDetails from './RepositoryDetails';
import {Link} from 'react-router';


class LandingPage extends Component {


  state = {
    timer: null,
    counter: 0,
    languageGraph: {},
    divOpen: false
  };

  componentWillMount() {
    this.props.getGithubProfile();
    this.props.getAllRepositories();
  }

  componentDidMount() {
    let timer = setInterval(this.tick.bind(this), 3000);
    this.setState({timer});
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    this.setState({
      counter: this.state.counter + 1
    });
    let arr = this.props.details.repositories;
    let key = Math.floor(Math.random() * arr.length - 1) + 1;
    if (this.state.counter === this.state.timer && this.props.selectedRepository != arr[key].name) {
      console.log(arr[key].name);
      this.setState({counter: 0});
      this.props.getRepositoryDetails(arr[key].name);
    }
  }

  openDiv(){

  }

  renderUser(detail) {
    const user = detail.user;
    const repositories = detail.repositories;
    return (
      <div>
        <div id="profile">
          {user.name} <br/>
          {user.bio}
          Followers: {user.followers}
          <p>Company : <Link to={user.company}>{user.company}</Link></p>
        </div>
          <div id="navcontainer">
            <ul className="cl-effect-1">
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
      let language = {};
      for (let i = 0; i < this.props.details.repositories.length; i++) {
        let value = this.props.details.repositories[i];
        if (Object.keys(language).length != 0 && Object.keys(language).includes(value.language)) {
          language[value.language] = language[value.language] + 1;
        } else {
          language[value.language] = 1;
        }
      }
      return (
        <div>
          <p>{this.props.selectedRepository}</p>
          <div id="charts-container">
            <UserDetailsChart userDetails={this.props.usersMap}/>
            <CommitDetailsChart commitDetails={this.props.commitDetails}/>
            <LanguageDetailsChart repositoryLanguages={language}/>
          </div>
          <div id="charts-container">
            <RepositoryDetails topCommiter={this.props.topCommiter}
                               commits={Object.keys(this.props.commitDetails).length}/>

          </div>

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
    selectedRepository: state.github.selectedRepository,
    usersMap: state.github.usersMap,
    commitDetails: state.github.commitDetails,
    topCommiter: state.github.topCommiter,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGithubProfile: getGithubProfile, getAllRepositories: getAllRepositories,
    getRepositoryDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
