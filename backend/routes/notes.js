const router = require('express').Router();
const NoteModel = require('../models/note');
const UserModel = require('../models/user');

router.get('/', async (req, res) => {
  const notesOwner = req.query.uid
  console.log('notesOwner', notesOwner)
  const notes = await NoteModel.find({uid: notesOwner});
  const user = await UserModel.findOne({_id: notesOwner}, 'username')
  const requestBody = {
    user,
    notes
  }
  res.json(requestBody);
})

module.exports = router;