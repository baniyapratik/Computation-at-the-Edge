const os = require('os');
const io = require('socket.io-client');

let socket = io('http://172.168.3.24:5002');
const keys = require('../config/keys');

socket.on('connect', () => {
  console.log('Im connected to the socket server..');
  const networkInterfaces = os.networkInterfaces();
  let macAddress;
  for (let key in networkInterfaces) {
    if (!networkInterfaces[key][0].internal) {
      macAddress = networkInterfaces[key][0].mac;
      break;
    }
  }
  // client auth with single key value
  socket.emit('clientAuth', keys['socketNodeClient']);

  performanceData().then(allPerformanceData => {
    allPerformanceData.macAddress = macAddress;
    socket.emit('initPerfData', allPerformanceData);
  });
  // start sending over data on interval
  let performanceInterval = setInterval(() => {
    performanceData().then(allPerformanceData => {
      //console.log(allData);
      allPerformanceData.macAddress = macAddress;
      socket.emit('performanceData', allPerformanceData);
    });
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Disconnected');
    clearInterval(performanceInterval);
  });
});

function performanceData() {
  return new Promise(async (resolve, reject) => {
    const osType = os.type() == 'Raspberry' ? 'Mac' : os.type();

    const upTime = os.uptime();
    // hostname
    const hostname = os.hostname();
    // Memory Info
    const totalMemory = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMemory - freeMem;
    const memUsage = Math.floor(usedMem / totalMemory) / 100;

    // CPU Info
    const cpus = os.cpus();
    const cpuModel = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const numCores = cpus.length;
    const cpuLoad = await getCpuLoad();
    resolve({
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
      hostname
    });
  });
}

function cpuAverage() {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach(aCore => {
    for (type in aCore.times) {
      totalMs += aCore.times.idle;
    }
    idleMs += aCore.times.idle;
  });
  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length
  };
}

function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;
      const percentageCpu =
        100 - Math.floor(100 * idleDifference / totalDifference);
      resolve(percentageCpu);
    }, 1000);
  });
}
