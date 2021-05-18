const UserModel = require('../models/user');
const express = require('express');

const router = express.Router();

router.post('/login', async (req, res) => {

  const user = await UserModel.findOne({
    username: req.body.username,
    passwd: req.body.passwd
  })
  
  if (user) {
    req.session.userId = user._id;

    res.json({
      status: 'success', 
      userName: user.username,
      userId: user._id
    })
    res.end();
  } 
  else {
    res.json({
      status: 'error', 
      message: `User with this username and password does not exist.`
    })
    res.end();
  }
})

module.exports = router;