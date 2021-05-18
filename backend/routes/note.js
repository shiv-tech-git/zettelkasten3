const NoteModel = require('../models/note');
const UserModel = require('../models/user');
const router = require('express').Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => {

  const note = req.body.note;
  const action = req.body.action;
  const uid = req.session.uid;

  const newTags = [];
  note.tags.forEach((tag) => {
    if (tag.id === 'new') {
      tag.id = new mongoose.Types.ObjectId()
      newTags.push(tag);
    }
  })
  
  if (newTags.length !== 0) {
    console.log('uid: ', uid)
    const user = await UserModel.findOne({_id: uid})
    newTags.forEach((tag) => {
      user.tags.push({_id: tag.id, name: tag.name})
    })
    user.save();
  }
  
  
  switch (action) {
    case 'create':
      const newNote = new NoteModel({
        uid,
        ...note
      })
      newNote.save();
      break;
    case 'update':
      break;
  }

  
})

module.exports = router;