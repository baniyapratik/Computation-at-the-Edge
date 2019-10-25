const mongoose = require('mongoose');
const { Schema } = mongoose;

const nodeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 512
  },
  dataPrivacy: {
    type: String,
    enum: ['Public', 'Private'],
    default: 'Public'
  },
  deviceType: {
    type: String,
    enum: ['web-cam', 'heat-sensor'],
    default: 'web-cam'
  },
  ipAddress: {
    type: String,
    required: true
  },
  isAlive: { type: Number, default: 0 },
  dateAdded: { type: Date, default: Date.now() },
  apiKey: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('nodes', nodeSchema);
