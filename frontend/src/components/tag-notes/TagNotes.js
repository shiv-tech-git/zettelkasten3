import NoteList from '../note-list/NoteList';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getNotesByTagId } from '../../utils/request';

const TagNotes = ({match}) => {
  console.log('here')

  const [notes, setNotes] = useState(null)
  const [tagData, setTagData] = useState(null)
  const myid = useSelector(state => state.auth.userData.userId)

  const uid = match.params.uid;
  const tid = match.params.tid;

  useEffect( async () => {
    const responce = await getNotesByTagId(uid, tid);
    setNotes(responce.notes);
    console.log("responce")
    setTagData({
      userName: responce.user.username,
      tagName: responce.tagName,
    })
  }, [])

  if (!notes || !tagData) return '';

  console.log(tagData)
  let title = '';
  if (myid === uid) {
    title = `My notes with tag: ${tagData.tagName}`
  }
  else {
    title = `${tagData.username}'s notes with tag: ${tagData.name}`
  }

  return (
    <NoteList
      title={title}
      notes={notes}
    />
  )
}

export default TagNotes;