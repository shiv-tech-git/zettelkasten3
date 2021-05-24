const router = require('express').Router();
const UserModel = require('../models/user');

router.get('/', async (req, res) => {
  const users = await UserModel.find({}, 'username tags');
  res.json(users);
})


module.exports = router;