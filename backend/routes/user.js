const router = require('express').Router();
const UserModel = require('../models/user');

router.get('/', async (req, res) => {
  const userId = req.query.uid;
  const user = await UserModel.findOne({_id: userId}, 'username, tags');
  res.json(user);
})


module.exports = router;