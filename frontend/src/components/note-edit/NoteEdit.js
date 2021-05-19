import './note-edit.css';

import NoteForm from '../note-form/NoteForm';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getNote, postNote } from '../../utils/request';

const NoteEdit = ({ match, history}) => {
  const [note, setNote] = useState(useSelector(state => state.notes[match.params.id]));

  const loadNote = async (nid) => {
    const note = await getNote(nid)
    setNote(note);
  }

  if (note === undefined || note._id !== match.params.id) {
    loadNote(match.params.id);
    return '';
  }

  const submitCallback = async (updated_note) => {
    const request_body = {
      action: 'update',
      note: {
        _id: note._id,
        ...updated_note
      }
    }
    const { _id } = await postNote(request_body);
    history.push(`/note/view/${_id}`);
  }

  return (
    <NoteForm 
      formMode="update"
      note={note}
      submitCallback={submitCallback}
    />
  );
}

export default NoteEdit;