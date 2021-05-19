const NoteModel = require('../models/note');
const UserModel = require('../models/user');
const router = require('express').Router();
const mongoose = require('mongoose');
const { rawListeners } = require('../models/note');

const handleNewTags = (note) => {
  const newTags = [];

  note.tags.forEach(async (tag) => {
    if (tag._id === 'new') {
      tag._id = new mongoose.Types.ObjectId()
      newTags.push(tag);
    }
  })

  return newTags;
}

const addTagsToUser = async (tags, uid) => {
  const user = await UserModel.findOne({_id: uid})
  tags.forEach((tag) => {
    user.tags.push({_id: tag._id, name: tag.name})
  })
  user.save();
}

router.post('/', async (req, res) => {

  const note = req.body.note;
  const action = req.body.action;
  const uid = req.session.uid;

  // const newTags = [];

  // note.tags.forEach(async (tag) => {
  //   if (tag._id === 'new') {
  //     tag._id = new mongoose.Types.ObjectId()
  //     newTags.push(tag);
  //   }
  // })
  
  const newTags = handleNewTags(note);

  if (newTags !== 0) {
    addTagsToUser(newTags, uid);
  }

  // if (newTags.length !== 0) {
  //   const user = await UserModel.findOne({_id: uid})
  //   newTags.forEach((tag) => {
  //     user.tags.push({_id: tag._id, name: tag.name})
  //   })
  //   user.save();
  // }
  
  
  switch (action) {
    case 'create':
      const newNote = new NoteModel({
        uid,
        ...note
      })
      const created_note = await newNote.save();
      res.json({_id: created_note._id})
      break;
    case 'update':
      const updating_note = await NoteModel.findOne({_id: note._id})
      updating_note.title = note.title;
      updating_note.tags = note.tags;
      updating_note.links = note.links;
      updating_note.body = note.body;
      const updated_note = await updating_note.save();
      res.json({_id: updated_note._id})
      break;
  }

  
})

router.get('/', async (req, res) => {
  const note_id = req.query.nid;
  const note = await NoteModel.findOne({_id: note_id});
  res.json(note);
})


module.exports = router;