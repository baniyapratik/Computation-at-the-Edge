const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Machine = new Schema({
  macAddress: String,
  cpuLoad: Number,
  freeMemory: Number,
  usedMemory: Number,
  totalMemory: Number,
  osType: String,
  cpuModel: String,
  numCores: Number,
  cpuSpeed: Number
});

module.exports = mongoose.model('Machine', Machine);
