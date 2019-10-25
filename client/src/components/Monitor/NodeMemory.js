import React, { Component } from 'react';
class NodeMemory extends Component {
  constructor() {
    super();
    this.state = {
      memData: ''
    };
  }
  componentDidMount() {
    this.setState({
      memData: this.props.memData
    });
  }
  render() {
    console.log(this.state.memData);
    return <div>Memory</div>;
  }
}
export default NodeMemory;
