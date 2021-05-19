const router = require('express').Router();
const NoteModel = require('../models/note');

router.get('/', async (req, res) => {
  const heads = await NoteModel.find({uid: req.query.uid}, 'title tags');
  res.json(heads);
})


module.exports = router;