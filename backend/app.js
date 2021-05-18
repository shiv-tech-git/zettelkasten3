const express = require('express');
const cors = require("cors");
const body_parser = require("body-parser");
const session = require('express-session');
const mongoose = require('mongoose');

const login = require('./routes/login');
const register = require('./routes/register');
const note = require('./routes/note');
const notes = require('./routes/notes');

const { getFullNotes, getNoteHeads, getNote, getAllTags } = require('./testData');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 4000,
  SESS_NAME = 'note_session',
  SESS_LIFETIME = TWO_HOURS,
  SESS_SECRET = 'session_secret' 
} = process.env;

//MONGOOSE
mongoose.connect('mongodb://127.0.0.1/zettelkasten', {useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;

database.on('error', () => {console.log("Mongoose error.")})
database.once("open", () => {
  console.log("Mongoose: Connection Successful!");
});


const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.json());

app.use(session({
  name: SESS_NAME,
  // resave: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    // secure: false
  }
}))

app.use('/login', login);

app.use('/register', register);

app.use('/note', note);

app.use('/notes', notes);

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