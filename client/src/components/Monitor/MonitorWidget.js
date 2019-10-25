import React, { Component } from 'react';
import socket from '../../utils/socketConnection';

import NodeWidget from './NodeWidget';
class Nodehealth extends Component {
  constructor() {
    super();
    this.state = {
      performanceData: {}
    };
  }
  componentDidMount() {
    socket.on('data', data => {
      const currentState = { ...this.state.performanceData };
      currentState[data.macAddress] = data;
      this.setState({
        performanceData: currentState
      });
    });
  }
  render() {
    let widgets = [];
    const data = this.state.performanceData;
    Object.entries(data).forEach(([key, value]) => {
      widgets.push(<NodeWidget key={key} data={value} />);
    });

    return <div className="App">{widgets}</div>;
  }
}
export default Nodehealth;
