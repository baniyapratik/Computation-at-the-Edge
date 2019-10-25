const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const Machine = require('./models/Machine');

function socketMain(io, socket) {
  let macAddress;
  socket.on('clientAuth', key => {
    if (key === keys.socketNodeClient) {
      socket.join('clients');
    } else if (key === keys.socketUiClient) {
      // valid UI client has joined
      socket.join('ui');
      console.log('A react client has joined');
    } else {
      socket.disconnect(true);
    }
  });
  socket.on('initPerfData', async data => {
    macAddress = data.macAddress;

    // now go to mongodb
    const mongooseResponse = await addToDB(data);
    console.log(mongooseResponse);
  });
  //console.log('A socket is connected', socket.id);
  socket.on('performanceData', data => {
    console.log('Tick....');
    io.to('ui').emit('data', data);
  });

  function addToDB(data) {
    return new Promise((resolve, reject) => {
      Machine.findOne({ macAddress: data.macAddress }, (err, doc) => {
        if (err) {
          throw err;
          reject(err);
        } else if (doc == null) {
          let newMachine = new Machine(data);
          newMachine.save();
          resolve('added');
        } else {
          resolve('found');
        }
      });
    });
  }
}
module.exports = socketMain;
