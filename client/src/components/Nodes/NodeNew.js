import React, { Component } from 'react';
import NodeForm from './NodeForm';
import NodeFormReview from './NodeFormReview';
class NodeNew extends Component {
  state = { showformReview: false };

  renderContent() {
    if (this.state.showformReview) {
      return (
        <NodeFormReview
          onCancel={() => this.setState({ showformReview: false })}
        />
      );
    }
    return (
      <NodeForm onFormSubmit={() => this.setState({ showformReview: true })} />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}
export default NodeNew;
