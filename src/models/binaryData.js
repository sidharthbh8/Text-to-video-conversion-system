const mongoose = require('mongoose');

const binaryDataSchema = new mongoose.Schema({
  binaryString: String,
});

const BinaryData = mongoose.model('BinaryData', binaryDataSchema);

module.exports = BinaryData;
