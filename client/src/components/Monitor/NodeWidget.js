import React, { Component } from 'react';

import NodeCpu from './NodeCpu';
import NodeInfo from './NodeInfo';
import NodeMemory from './NodeMemory';

class NodeWidget extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const {
      freeMem,
      totalMemory,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
      hostname,
      macAddress
    } = this.props.data;
    const cpu = { cpuLoad };
    const mem = { totalMemory, usedMem, memUsage, freeMem };
    const info = {
      macAddress,
      osType,
      upTime,
      cpuModel,
      hostname,
      numCores,
      cpuSpeed
    };
    return (
      <div>
        <h2>Node health Widget</h2>
        <NodeCpu cpuData={cpu} />
        <NodeInfo infoData={info} />
        <NodeMemory memData={mem} />
      </div>
    );
  }
}
export default NodeWidget;
