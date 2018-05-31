import React, {Component} from 'react';

class RepositoryDetails extends Component {

  render() {
    return (
      <div>
        <table>
          <colgroup>
            <col class="cols-4"></col>
          </colgroup>
          <tbody>
          <tr>
            <td>
              Username:
            </td>
            <td>
              {this.props.topCommiter}
            </td>
          </tr>
          <tr>
            <td>
              Total Commits:
            </td>
            <td>
              {this.props.commits}
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    );
  }
}

export default RepositoryDetails;
