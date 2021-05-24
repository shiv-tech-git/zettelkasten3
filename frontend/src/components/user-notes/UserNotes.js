// import './note-list.css';

import NoteListElement from '../note-list-element/NoteListItem';
import NoteList from '../note-list/NoteList';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { addNotes } from '../../redux/actions';

import { getNotesByUserId } from '../../utils/request';


const UserNotes = ({match}) => {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const myId = match.params.uid;
  const uid = useSelector(state => state.auth.userData.userId);
  const dispatch = useDispatch();

  useEffect(async () => {
    const responce = await getNotesByUserId(match.params.uid);
    setNotes(responce.notes);
    setUser(responce.user);
    console.log(responce.user)
  }, [])
  
  if (notes.length === 0 || !user) return '';

  let title = '';
  if (myId === uid) {
    title = "My tags"
  }
  else {
    title = `${user.username}'s notes`
  }

  return (
    <NoteList
      title={title}
      notes={notes}
    />
  )
}

export default UserNotes;

