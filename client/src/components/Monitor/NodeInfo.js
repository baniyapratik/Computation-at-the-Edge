import React, { Component } from 'react';
class NodeInfo extends Component {
  constructor() {
    super();
    this.state = {
      infoData: ''
    };
  }
  componentDidMount() {
    this.setState({
      infoData: this.props.infoData
    });
  }
  render() {
    console.log(this.state.infoData);
    return <div>Info</div>;
  }
}
export default NodeInfo;
