const { Schema, model } = require('mongoose');

const postsSchema = Schema({

  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  filename: {
    type: String,
    unique: true,
  },
  fileURL: {
    type: String,
    unique: true,
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tags',
  }],

}, {
  timestamps: true,
});

module.exports = model('Posts', postsSchema);
