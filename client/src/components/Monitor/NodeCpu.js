import React, { Component } from 'react';

class NodeCpu extends Component {
  constructor() {
    super();
    this.state = {
      cpuData: ''
    };
  }
  componentDidMount() {
    this.setState({
      cpuData: this.props.cpuData
    });
  }
  render() {
    console.log(this.state.cpuData);
    return <div>CPU</div>;
  }
}
export default NodeCpu;
