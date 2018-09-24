import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGithubProfile, getAllRepositories, getRepositoryDetails, getYearlyCommitActivity} from '../actions/index';
import UserDetailsChart from './UserDetailsChart';
import CommitDetailsChart from './CommitDetailsChart';
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
    this.props.getAllRepositories();
  }

  // componentDidMount() {
  //   // let timer = setInterval(this.tick.bind(this), 3000);
  //   // this.setState({timer});
  // }
  //
  // componentWillUnmount() {
  //   this.clearInterval(this.state.timer);
  // }
  //
  // tick() {
  //   this.setState({
  //     counter: this.state.counter + 1
  //   });
  //   let arr = this.props.repositories;
  //   let key = Math.floor(Math.random() * arr.length - 1) + 1;
  //   if (this.state.counter === this.state.timer && this.props.selectedRepository != arr[key].name) {
  //     console.log(arr[key].name);
  //     this.setState({counter: 0});
  //     this.props.getRepositoryDetails(arr[key].name);
  //   }
  // }



  renderRepositoryList(repositories) {
    return (
      <div>
        <div id="navcontainer">
          <ul className="cl-effect-1">
            {
              repositories.map((value) => {
                return (
                  <li key={value.name} className="list">
                    <Link onClick={() => {
                      this.props.getRepositoryDetails(value.name);
                      this.props.getYearlyCommitActivity(value.name);
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
        <div>
          <div id="charts-container">
            <UserDetailsChart userDetails={this.props.commitPerUser}/>
            <CommitDetailsChart commitDetails={this.props.yearlyCommits}/>
          </div>
          <div id="charts-container">
            <RepositoryDetails
              topCommiter={this.props.topCommiter}
              commits={Object.keys(this.props.commitDetails).length}
            />
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
          {this.renderRepositoryList(this.props.repositories)}
          {this.renderRepositoryDetails(this.props.selectedRepository)}
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    loading: state.github.loading,
    repositories: state.github.repositories,
    selectedRepository: state.github.selectedRepository,
    usersMap: state.github.usersMap,
    commitDetails: state.github.commitDetails,
    topCommiter: state.github.topCommiter,
    commitPerUser: state.github.commitPerUser,
    yearlyCommits : state.github.repositoryYearlyCommitHistory
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGithubProfile: getGithubProfile, getAllRepositories: getAllRepositories,
    getRepositoryDetails,
    getYearlyCommitActivity
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
