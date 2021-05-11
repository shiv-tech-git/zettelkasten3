import './note-view.css';

import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react';

import { fetchNote } from '../../utils/request';

import LinkItem from '../linkItem/LinkItem';

const NoteView = ({ match }) => {
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
    <div className="note-view-wrapper">
      <div className="note_view">
    <h2>{note.title}</h2>
    <div className="tags">
      <h3>Tags: </h3>
      {note.tags.map((tag) => {
        return <LinkItem
          key={tag.id}
          id={tag.id}
          name={tag.name}
          edit={false}
          type="tag"
        />
      })}
    </div>
    <div className="links">
      <h3>Links: </h3>
      {note.links.map((note) => {
        return <LinkItem
          key={note.id}
          id={note.id}
          name={note.title}
          edit={false}
          type="note"
        />
      })}
    </div>
    <div className="body">{note.body}</div>
    </div>
    </div>
    
  )
}

export default NoteView;

