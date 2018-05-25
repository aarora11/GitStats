import React, {Component} from 'react';

class RepositoryDetails extends Component {

  render() {
    return (
      <div>
        <p>
          {this.props.topCommiter}
        </p>
        <p>
          {this.props.commits}
        </p>
      </div>
    );
  }
}

export default RepositoryDetails;
