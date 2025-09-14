const mongoose = require('mongoose');

const ScanResultSchema = new mongoose.Schema({
  url: String,
  safe: Boolean,
  threats: [String],
  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanResult', ScanResultSchema);
