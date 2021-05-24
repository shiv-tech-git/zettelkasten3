const UserModel = require('../models/user');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { saltRounds } = require('../secure');

router.post('/', async (req, res) => {

  const user = await UserModel.findOne({
    username: req.body.username,
  })
  
  bcrypt.compare(req.body.passwd, user.passwd, function(err, check_result) {
    if (check_result) {
      req.session.uid = user._id;

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
  });

})

module.exports = router;