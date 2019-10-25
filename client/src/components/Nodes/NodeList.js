import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../../actions';
import { Link } from 'react-router-dom';
class NodeList extends Component {
  componentDidMount() {
    this.props.fetchNodes();
  }
  renderList() {
    console.log(this.props.nodes);
    return this.props.nodes.map(node => {
      return (
        <div className="card" key={node._id}>
          <div className="content">
            <div className="header">Name: {node.name}</div>

            <div className="description">
              Type: {node.deviceType} <br />
              Status: {node.isAlive} <br />
              Date Added: {node.dateAdded} <br />
            </div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <div className="ui basic green button">View</div>
              <Link
                to={`/nodes/delete/${node._id}`}
                className="ui basic red button"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="container">
        <div className="ui  three stackable cards">{this.renderList()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { nodes: Object.values(state.nodes) };
};
export default connect(mapStateToProps, { fetchNodes })(NodeList);
