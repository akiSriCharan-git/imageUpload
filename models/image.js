const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  postedAt: {
    type: Date,
    default: Date.now()
  },
  postedBy: String,
  img:{
        data: Buffer,
        contentType: String
    }
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image
