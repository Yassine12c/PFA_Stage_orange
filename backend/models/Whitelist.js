const mongoose = require('mongoose');

const whitelistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  urls: { type: [String], default: [] }
});

module.exports = mongoose.model('Whitelist', whitelistSchema);
