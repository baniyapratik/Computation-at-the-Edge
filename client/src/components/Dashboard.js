import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NodeList from './Nodes/NodeList';
class Dashboard extends Component {
  render() {
    return (
      <div>
        <br />
        <h1 class="ui center aligned icon header">List of Nodes</h1>
        <div className="fixed-action-btn">
          <Link to="/node/new" className="ui blue button">
            <i className="plus icon" /> Add Node
          </Link>
        </div>
        <br />
        <NodeList />
      </div>
    );
  }
}
export default Dashboard;
