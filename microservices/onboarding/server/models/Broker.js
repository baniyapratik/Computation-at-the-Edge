const mongoose = require('mongoose');
const { Schema } = mongoose;
const NodeSchema = require('./Node');

const brokerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 512
  },
  count: { type: Number, default: 0 },
  nodes: [NodeSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('zones', brokerSchema);
