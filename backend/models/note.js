const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  uid: mongoose.Schema.Types.ObjectId,
  nid: mongoose.Schema.Types.ObjectId,
  title: String,
  body: String,
  links: Array,
  tags: Array,
  create: Date,
  update: Date,
});

module.exports = mongoose.model('notes', NoteSchema)