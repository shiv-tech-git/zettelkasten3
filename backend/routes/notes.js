const router = require('express').Router();
const NoteModel = require('../models/note');

router.post('/', async (req, res) => {
  const notes_owner = req.body.uid
  const notes = await NoteModel.find({uid: notes_owner});
  console.log('notes', notes)
  res.json(notes);
})

module.exports = router;