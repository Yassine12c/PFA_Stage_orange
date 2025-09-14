const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  safe: { type: Boolean, required: true },
  threats: { type: [String], default: [] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
