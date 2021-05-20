const router = require('express').Router();
const UserModel = require('../models/user');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const uid = req.query.uid;
  const user = await UserModel.findOne({_id: mongoose.Types.ObjectId(uid)}, 'username, tags');
  res.json(user);
})


module.exports = router;