const note = {
  id: 1,
  title: 'Note title ',
  tags: [
    { id: 1, name: 'tag1'},
    { id: 2, name: 'tag2'},
    { id: 3, name: 'tag3'},
    { id: 4, name: 'tag4'},
  ],
  links: [
    { id: 1, title: 'note_1'},
    { id: 2, title: 'note_2'},
    { id: 3, title: 'note_3'},
    { id: 4, title: 'note_4'},
  ],
  body: 'The body of the note.'
}

const getFullNotes = (uid, number) => {
  let notes = [];
  for (i = 0; i < number; i++) {
    notes.push({
      ...note, 
      id: i,
      title: note.title + i
    })
  }
  return notes;
}

const getNoteHeads = (uid) => {
  let number = 10;
  let heads = [];
  for (i = 0; i < number; i++) {
    heads.push({
      title: note.title + i,
      tabs: note.tags
    })
  }
  return heads;
}

const getNote = (noteId) => {
  return {
    ...note, 
    id: noteId, 
    title: note.title + noteId
  }
}


module.exports = {
  getFullNotes,
  getNoteHeads,
  getNote
}