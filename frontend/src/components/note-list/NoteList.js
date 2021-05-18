import './note-list.css';

import NoteListElement from '../note-list-element/NoteListItem';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addNotes } from '../../redux/actions';

import { fetchNotes } from '../../utils/request';


export default () => {

  const [noteList, setNoteList] = useState([])

  const userId = useSelector(state => state.auth.userData.userId);
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  
  const getNoteList = async (numberOfNotes) => {
    return await fetchNotes(userId, numberOfNotes);
  }

  useEffect(async () => {
    let notes = await getNoteList(10);
    dispatch(addNotes(notes));
    setNoteList(notes);
  }, [])
  
  return (
    <div className="note_list">
      <h2>My notes</h2>
      {noteList.map((note, index) => {
        return <NoteListElement 
          key={note._id}
          note={note}
        />;
      })}
    </div>
  )
}

