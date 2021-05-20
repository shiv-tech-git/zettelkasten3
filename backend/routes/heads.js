const router = require('express').Router();
const NoteModel = require('../models/note');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const uid = req.query.uid;
  const heads = await NoteModel.find({uid: mongoose.Types.ObjectId(uid)}, 'title tags');
  res.json(heads);
})


module.exports = router;