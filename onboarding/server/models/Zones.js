const mongoose = require('mongoose');
const { Schema } = mongoose;
const NodesSchema = require('./Nodes');

const zonesSchema = new Schema({
  name: String,
  count: Number,
  nodes: [NodesSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('zones', zonesSchema);
