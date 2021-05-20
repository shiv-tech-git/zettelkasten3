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
    }
  })
  return newLinkIds;
}

const filterDeletedLinks = (note) => {
  const deletedLinksId = [];

  note.links = note.links.filter( link => {
    if (link.status === "deleted") {
      deletedLinksId.push(link._id)
      return false;
    }
    return true;
  })
  return deletedLinksId;
}

const removeLinksStatus = (note) => {
  note.links.forEach( link => {
    delete link.status;
  })
}

const handleNewLinks = (newLinkIds, createdNote) => {
  newLinkIds.forEach( async (linkId) => {
    const note = await NoteModel.findOne({_id: linkId});
    note.links.push({
      title: createdNote.title,
      _id: createdNote._id
    });
    note.save();
  })
}

const handleDeletedLinks = (deletedLinksId, updatedNoteId) => {
  deletedLinksId.forEach( async (linkId) => {
    const note = await NoteModel.findOne({_id: linkId});
    const links = note.links.filter( link => {
      if (link._id == updatedNoteId) {
        return false;
      }
      return true;
    })
    note.links = links;
    note.save();
  })
}

//CREATE
router.post('/', async (req, res) => {

  const note = req.body;
  const uid = req.session.uid;
  
  handleNewTags(note, uid);

  const newLinkIds = filterNewLinks(note);

  const newNote = new NoteModel({
    uid,
    create: new Date(),
    update: new Date(),
    ...note
  })
  const createdNote = await newNote.save();

  handleNewLinks(newLinkIds, createdNote);

  res.json({_id: createdNote._id})
})

//UPDATE
router.put('/', async (req, res) => {

  const note = req.body;
  const uid = req.session.uid;
  
  handleNewTags(note, uid);

  const newLinkIds = filterNewLinks(note);
  const deletedLinksIds = filterDeletedLinks(note);
  removeLinksStatus(note);

  const updatingNote = await NoteModel.findOne({_id: note._id})
  updatingNote.title = note.title;
  updatingNote.tags = note.tags;
  updatingNote.links = note.links;
  updatingNote.body = note.body;
  updatingNote.update = new Date();
  const updatedNote = await updatingNote.save();

  handleNewLinks(newLinkIds, updatedNote);
  handleDeletedLinks(deletedLinksIds, updatedNote._id);

  res.json({_id: updatedNote._id})
})

//GET
router.get('/', async (req, res) => {
  const note_id = req.query.nid;
  const note = await NoteModel.findOne({_id: note_id});
  res.json(note);
})

//DELETE 
router.delete('/', async (req, res) => {
  await NoteModel.deleteOne({_id: req.body.nid})
  res.json({status: 'ok', message: 'note has been deleted'});
})


module.exports = router;