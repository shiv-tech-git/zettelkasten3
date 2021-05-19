const router = require('express').Router();
const NoteModel = require('../models/note');
const UserModel = require('../models/user');

router.get('/uid', async (req, res) => {
  const notesOwner = req.query.uid
  const notes = await NoteModel.find({uid: notesOwner});
  const user = await UserModel.findOne({_id: notesOwner}, 'username')
  const requestBody = {
    user,
    notes
  }
  res.json(requestBody);
})

router.get('/tid', async (req, res) => {
  const notes = await NoteModel.find({tags: {_id: req.query.tid}});
  const user = await UserModel.findOne({_id: notesOwner}, 'username')
  const requestBody = {
    user,
    notes
  }
  res.json(requestBody);
})

module.exports = router;