// import './note-list.css';

import NoteListElement from '../note-list-element/NoteListItem';
import NoteList from '../note-list/NoteList';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addNotes } from '../../redux/actions';

import { getNotesByUserId } from '../../utils/request';


const UserNotes = ({match}) => {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')

  const userId = useSelector(state => state.auth.userData.userId);
  const dispatch = useDispatch();

  useEffect(async () => {
    const responce = await getNotesByUserId(match.params.id);
    console.log(responce)
    dispatch(addNotes(responce.notes));
    setNotes(responce.notes);
    if (userId === match.params.id) setTitle('My notes')
    else setTitle(`${responce.user.username}`)
  }, [])
  
  if (notes.length === 0) return <></>;
  console.log(notes)
  return (
    <NoteList
      title={title}
      notes={notes}
    />
  )
}

export default UserNotes;

