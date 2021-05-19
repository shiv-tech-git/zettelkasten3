import NoteList from '../note-list/NoteList';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getNotesByTagId } from '../../utils/request';


const TagNotes = ({match}) => {

  console.log(getNotesByTagId(match.params.tid))

  // const [notes, setNotes] = useState([])
  // const [title, setTitle] = useState('')

  // const userId = useSelector(state => state.auth.userData.userId);
  // const dispatch = useDispatch();

  // useEffect(async () => {
  //   const responce = await getNotesByUserId(match.params.uid);
  //   console.log(responce)
  //   dispatch(addNotes(responce.notes));
  //   setNotes(responce.notes);
  //   if (userId === match.params.uid) setTitle('My notes')
  //   else setTitle(`${responce.user.username}`)
  // }, [])
  
  // if (notes.length === 0) return <></>;

  // console.log(notes)
  return (
    // <NoteList
    //   title={title}
    //   notes={notes}
    // />
    <div className="">hello</div>
  )
}

export default TagNotes;