const express = require('express');
const cors = require("cors");
const body_parser = require("body-parser");

const { getFullNotes, getNoteHeads, getNote, getAllTags } = require('./testData');


const app = express();
app.use(cors())

app.use(express.json());

app.post('/login', (req, res) => {
  res.json({
    status: 'success', 
    userName: req.body.login,
    userId: 1
  })
})

app.post('/register', (req, res) => {
  res.json({
    status: 'success', 
    userName: req.body.login
  })
})

app.post('/notes', (req, res) => {
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