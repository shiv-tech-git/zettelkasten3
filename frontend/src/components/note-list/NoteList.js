import './note-list.css';

import NoteListElement from '../note-list-element/NoteListItem';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addNotes } from '../../redux/actions';

import { fetchNotes } from '../../utils/request';


const NoteList = ({title, notes}) => {
  return (
    <div className="note_list">
      <h2>{title}</h2>
      {notes.map((note, index) => {
        return <NoteListElement 
          key={note._id}
          note={note}
        />;
      })}
    </div>
  )
}

export default NoteList;