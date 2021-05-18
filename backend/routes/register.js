const router = require('express').Router();
const UserModel = require('../models/user');

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

  
  matched_user = await UserModel.findOne({passwd: req.body.passwd})
  if (matched_user && matched_user.passwd === req.body.passwd) {
    res.json({
      status: 'error', 
      message: `User with this email ${req.body.email} is already exists`
    })
    res.end()
    return;
  }

  const new_user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    passwd: req.body.passwd,
    tags: []
  })

  new_user.save((err, doc) => {
    if (err) return console.error(err)
    console.log("success: ", doc)
  })
  
  res.json({
    status: 'success',
    message: `You have successfully registered as ${req.body.username}`,
  })
  res.end()
})

module.exports = router;