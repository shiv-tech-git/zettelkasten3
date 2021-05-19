import './note-list.css';

import NoteListElement from '../note-list-element/NoteListItem';

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