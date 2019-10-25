const express = require('express');
const cluster = require('cluster');
const net = require('net');
const helmet = require('helmet');
const socketio = require('socket.io');
const ioRedis = require('socket.io-redis');
const farmhash = require('farmhash');
const socketMain = require('./socketMain');

const PORT = 5002;
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  let workers = [];

  let spawn = function() {
    workers[i] = cluster.fork();
    // restart the worker on exit
    workers[i].on('exit', function(code, signal) {
      spawn(i);
    });
  };
  // spawn workers
  for (var i = 0; i < numCPUs; i++) {
    spawn(i);
  }
  // returns a number containing the 32-bit unsigned integer fingerprint value of input
  const worker_index = function(ip, len) {
    return farmhash.fingerprint32(ip) % len;
  };
  const server = net.createServer({ pauseOnConnect: true }, connection => {
    let worker = workers[worker_index(connection.remoteAddress, numCPUs)];
    worker.send('sticky-session:connection', connection);
  });
  server.listen(PORT);
  console.log(`Master listening on port: ${PORT}`);
} else {
  let app = express();
  app.use(helmet());

  const server = app.listen(0, 'docker-monitoring-server');
  const io = socketio(server);
  io.adapter(ioRedis({ host: 'redis', port: 6379 }));

  io.on('connection', function(socket) {
    socketMain(io, socket);
    console.log(`connected to worker: ${cluster.worker.id}`);
  });

  // Listen to the message from the master. Ignore everything else
  process.on('message', function(message, connection) {
    if (message != 'sticky-session:connection') {
      return;
    }
    server.emit('connection', connection);
    connection.resume();
  });
}
