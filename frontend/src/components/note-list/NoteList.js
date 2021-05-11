import './note-list.css';

import NoteListElement from '../note-list-element/NoteListItem';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addNotes } from '../../redux/actions';

import { fetchUserNotes } from '../../utils/request';


export default () => {

  const [noteList, setNoteList] = useState([])

  const userId = useSelector(state => state.auth.userData.userId);
  const dispatch = useDispatch();
  
  const getNoteList = async (numberOfNotes) => {
    return await fetchUserNotes(userId, numberOfNotes);
  }

  useEffect(async () => {
    let notes = await getNoteList(10);
    dispatch(addNotes(notes));
    setNoteList(notes);
  }, [])
  
  return (
    <div className="note_list">
      <h2>My notes</h2>
      {noteList.map((item, index) => {
        return <NoteListElement 
          key={index}
          id={item.id}
          title={item.title} 
          body={item.body}
          tags={item.tags}
        />;
      })}
    </div>
  )
}

