const express = require('express');
const cors = require("cors");
const body_parser = require("body-parser");
const session = require('express-session');
const mongoose = require('mongoose');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const noteRouter = require('./routes/note');
const userRouter = require('./routes/user');
const notesRouter = require('./routes/notes');

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

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/note', noteRouter);

app.use('/user', userRouter);

app.use('/notes', notesRouter)

app.post('/heads', (req, res) => {
  console.log(req.session)
  res.json(getNoteHeads(req.body.uid))
})

app.listen(4000, () => console.log('API is running on port 4000'));