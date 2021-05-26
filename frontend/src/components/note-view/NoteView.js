import './note-view.css';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getNote, deleteNote } from '../../utils/request';

import LinkItem from '../link-item/LinkItem';

const NoteView = ({ match }) => {

  console.log('render');
  
  const [note, setNote] = useState(null);
  const myid = useSelector(state => state.auth.userData.userId)
  const history = useHistory();
  const nid = match.params.nid;

  useEffect(async () => {
    const note = await getNote(nid)
    setNote(note);
  }, [nid])

  const deleteHandler = async (event) => {
    event.preventDefault();
    const responce = await deleteNote({nid: note._id})
    if (responce.status === "ok") {
      history.push(`/notes/user/${myid}`)
    }
  }

  if (!note) return '';
  
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
              link={`/notes/user/${note.uid}/tag/${tag._id}`}
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
              link={`/note/view/${note._id}`}
            />
          })}
        </div>
        <div className="body">{note.body}</div>
        <div className="btn_block">
          <Link className='button' to={`/note/edit/${note._id}`}>Edit</Link>
          <Link className='button' to={{
            pathname: `/note/create`,
            initLink: {_id: note._id, title: note.title, status: 'new'}
          }}> New Note </Link>
          <button onClick={deleteHandler} className="button" disabled={(note.links.length > 1 ? true : false)} >Delete</button>
        </div>
      </div>
    </div>
    
  )
}

export default NoteView;

