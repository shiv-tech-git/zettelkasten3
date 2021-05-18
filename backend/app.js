const express = require('express');
const cors = require("cors");
const body_parser = require("body-parser");
const session = require('express-session');
const mongoose = require('mongoose');

const login = require('./routes/login');
const register = require('./routes/register');
const UserModel = require('./models/user');

const { getFullNotes, getNoteHeads, getNote, getAllTags } = require('./testData');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 4000,
  SESS_NAME = 'sid',
  SESS_LIFETIME = TWO_HOURS,
  SESS_SECRET = 'session_secret' 
} = process.env;

const users = [
  {id: 1, username: 'Alex', email: 'alex@gmail.com', passwd: 'secret'},
  {id: 4, username: 'a', email: 'alex@gmail.com', passwd: 'a'},
  {id: 2, username: 'Mike', email: 'mike@gmail.com', passwd: 'secret'},
  {id: 3, username: 'Jax', email: 'jaxjaxjaxjaxjaxjaxjaxjax@gmail.com', passwd: 'secret'},
]

//MONGOOSE
mongoose.connect('mongodb://127.0.0.1/zettelkasten', {useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;

database.on('error', () => {console.log("Mongoose error.")})
database.once("open", () => {
  console.log("Mongoose: Connection Successful!");
});


// const UserSchema = mongoose.Schema({
//   username: String,
//   email: String,
//   passwd: String
// });

// const UserModel = mongoose.model('users', UserSchema)
//MONGOOSE

console.log('us', typeof UserModel)

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.json());

app.use(session({
  // name: SESS_NAME,
  // resave: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    // secure: false
  }
}))


// app.post('/login', async (req, res) => {

//   const user = await UserModel.findOne({
//     username: req.body.username,
//     passwd: req.body.passwd
//   })
  
//   if (user) {
//     req.session.userId = user._id;

//     res.json({
//       status: 'success', 
//       userName: user.username,
//       userId: user._id
//     })
//     res.end();
//   } 
//   else {
//     res.json({
//       status: 'error', 
//       message: `User with this username and password does not exist.`
//     })
//     res.end();
//   }
// })

app.use('/', login);

app.use('/', register);

// app.post('/register', (req, res) => {
//   if (users.find((user) => user.username === req.body.username && user.passwd === req.body.passwd)) {
//     res.json({
//       status: 'error', 
//       message: `User with this username ${req.body.username} is already exists`
//     })
//     res.end()
//   }

//   if (users.find((user) => user.email === req.body.email)) {
//     res.json({
//       status: 'error', 
//       message: `User with this email ${req.body.email} is already exists`
//     })
//     res.end()
//   }

//   const new_user = new UserModel({
//     username: req.body.username,
//     email: req.body.email,
//     passwd: req.body.passwd,
//   })

//   new_user.save((err, doc) => {
//     if (err) return console.error(err)
//     console.log("success: ", doc)
//   })
  
//   res.json({
//     status: 'success',
//     message: `You have successfully registered as ${req.body.username}`,
//   })
//   res.end()
// })

app.post('/notes', async (req, res) => {
  res.json(getFullNotes(req.body.uid, req.body.numberOfNotes))
})

app.post('/heads', (req, res) => {
  res.json(getNoteHeads(req.body.uid))
})

app.post('/get-note', (req, res) => {
  res.json(getNote(req.body.nid))
})

app.post('/tags', (req, res) => {
  res.json(getAllTags())
})


app.listen(4000, () => console.log('API is running on port 4000'));