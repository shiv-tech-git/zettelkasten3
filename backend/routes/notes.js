const router = require('express').Router();
const NoteModel = require('../models/note');
const UserModel = require('../models/user');
const mongoose = require('mongoose');

const getTagNameById = (user, tagId) => {
  const tagsLength = user.tags.length;
  for (let i = 0; i < tagsLength; i++) {
    if (user.tags[i]._id == tagId) {
      return user.tags[i].name;
    }
  }
}

router.get('/uid', async (req, res) => {
  const uid = req.query.uid
  const notes = await NoteModel.find({uid: uid});
  const user = await UserModel.findOne({_id: uid}, 'username')
  const requestBody = {
    user,
    notes
  }
  res.json(requestBody);
})

router.get('/uid/tid', async (req, res) => {
  const uid = req.query.uid;
  const tid = req.query.tid;

  console.log(uid, tid);

  const notes = await NoteModel.find({
    uid: mongoose.Types.ObjectId(uid),
    tags: { $elemMatch: {_id: mongoose.Types.ObjectId(tid)} }
  });
  
  console.log(notes);

  const user = await UserModel.findOne({
    _id: uid}, 'username tags');
  const tagName = getTagNameById(user, tid);
  const requestBody = {
    tagName,
    user: {
      uid: user._id,
      username: user.username,
    },
    notes
  }
  res.json(requestBody);
})

module.exports = router;