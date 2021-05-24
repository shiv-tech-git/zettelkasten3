const router = require('express').Router();
const UserModel = require('../models/user');

const bcrypt = require('bcrypt');
const { saltRounds } = require('../secure');

router.post('/', async (req, res) => {

  let matched_user = await UserModel.findOne({username: req.body.username})
  if (matched_user && matched_user.username === req.body.username) {
    res.json({
      status: 'error', 
      message: `User with this username ${req.body.username} is already exists`
    })
    res.end()
    return;
  }

  matched_user = null;
  matched_user = await UserModel.findOne({email: req.body.email})
  if (matched_user && matched_user.email === req.body.email) {
    res.json({
      status: 'error', 
      message: `User with this email ${req.body.email} is already exists`
    })
    res.end()
    return;
  }
  
  bcrypt.hash(req.body.passwd, saltRounds, function(err, hashPass) {
    const new_user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      passwd: hashPass,
      tags: []
    })
  
    new_user.save((err, doc) => {
      if (err) return console.error(err)
    })
    
    res.json({
      status: 'success',
      message: `You have successfully registered as ${req.body.username}`,
    })
    res.end()
  });

})

module.exports = router;