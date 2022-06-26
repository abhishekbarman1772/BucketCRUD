const { Schema, model } = require('mongoose');

const tagsSchema = Schema({

  name: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = model('Tags', tagsSchema);
