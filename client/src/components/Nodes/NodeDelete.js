import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchNode, deleteNode } from '../../actions';

class NodeDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchNode(this.props.match.params.id);
  }
  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteNode(id)}
          className="ui primary button"
        >
          Delete
        </button>
        <Link to="/nodes/show" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }
  renderContent() {
    if (!this.props.node) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete this stream with title: ${
      this.props.node.name
    }`;
  }
  render() {
    return (
      <Modal
        title="DELETE Node"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/nodes/show')}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { node: state.nodes[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchNode, deleteNode })(NodeDelete);
