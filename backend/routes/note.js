const NoteModel = require('../models/note');
const UserModel = require('../models/user');
const router = require('express').Router();
const mongoose = require('mongoose');
const { rawListeners } = require('../models/note');

const setIdtoNewTags = (note) => {
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
  await user.save();
}

const handleNewTags = (note, uid) => {
  const newTags = setIdtoNewTags(note);

  if (newTags !== 0) {
    addTagsToUser(newTags, uid);
  }
}

const filterNewLinks = (note) => {
  const newLinkIds = [];

  note.links.forEach((link) => {
    if (link.status && link.status === 'new') {
      newLinkIds.push(link._id);
      delete link.status
    }
  })

  return newLinkIds;
}

const handleNewLinks = (newLinkIds, newNote) => {
  newLinkIds.forEach( async (linkId) => {
    const note = await NoteModel.findOne({_id: linkId});
    note.links.push({
      title: newNote.title,
      _id: newNote._id
    });
    note.save();
  })
}

router.post('/', async (req, res) => {

  const note = req.body;
  const uid = req.session.uid;
  
  handleNewTags(note, uid);

  const newLinkIds = filterNewLinks(note);

  const newNote = new NoteModel({
    uid,
    ...note
  })
  const createdNote = await newNote.save();

  handleNewLinks(newLinkIds, createdNote);

  res.json({_id: createdNote._id})
})

router.put('/', async (req, res) => {

  const note = req.body;
  const uid = req.session.uid;
  
  handleNewTags(note, uid);

  const newLinkIds = filterNewLinks(note);

  const updating_note = await NoteModel.findOne({_id: note._id})
  updating_note.title = note.title;
  updating_note.tags = note.tags;
  updating_note.links = note.links;
  updating_note.body = note.body;
  const updated_note = await updating_note.save();

  handleNewLinks(newLinkIds, updated_note);

  res.json({_id: updated_note._id})
})

router.get('/', async (req, res) => {
  const note_id = req.query.nid;
  const note = await NoteModel.findOne({_id: note_id});
  res.json(note);
})


module.exports = router;