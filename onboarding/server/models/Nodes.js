const mongoose = require('mongoose');
const { Schema } = mongoose;

const nodesSchema = new Schema({
  name: String,
  count: Integer,
  isalive: { type: Number, default: 0 },
  dateAdded: { type: Date, default: Date.now() }
});

mongoose.model('nodes', nodesSchema);
