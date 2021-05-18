import './note-edit.css';

import NoteForm from '../note-form/NoteForm';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchNote } from '../../utils/request';

const NoteEdit = ({ match }) => {
  const [note, setNote] = useState(useSelector(state => state.notes[match.params.id]));

  const loadNote = async (nid) => {
    const note = await fetchNote(nid)
    setNote(note);
  }

  if (note === undefined || note.id !== match.params.id) {
    loadNote(match.params.id);
    return '';
  }

  return (
    <NoteForm 
      title={note.title}
      formMode="update"
      note={note}
    />
  );
}

export default NoteEdit;