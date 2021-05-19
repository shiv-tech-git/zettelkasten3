import './note-view.css';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getNote } from '../../utils/request';

import LinkItem from '../link-item/LinkItem';

const NoteView = ({ match }) => {
  const [note, setNote] = useState(useSelector(state => state.notes[match.params.id]));

  const loadNote = async (nid) => {
    const note = await getNote(nid)
    setNote(note);
  }

  
  if (note === undefined || note._id !== match.params.id) {
    console.log('multiple render')
    loadNote(match.params.id);
    return "";
  }

  return (
    <div className="note-view-wrapper">
      <div className="note_view">
        <h2>{note.title}</h2>
        <div className="tags">
          <h3>Tags: </h3>
          {note.tags.map((tag) => {
            return <LinkItem
              key={tag._id}
              itemId={tag._id}
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
              key={note._id}
              itemId={note._id}
              name={note.title}
              edit={false}
              type="note"
            />
          })}
        </div>
        <div className="body">{note.body}</div>
        <Link className='edit_button' to={`/note/edit/${note._id}`}>Edit</Link>
      </div>
    </div>
    
  )
}

export default NoteView;

