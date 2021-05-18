import './note-list-item.css'

import { Link } from 'react-router-dom';

const NoteListElement = ({note}) => {

  return (
    <div className="note_list_element">

      <Link to={`/note-view/${note._id}`}>
        <h3>{note.title}</h3>
        <div className="tags">
          Tags: 
          <i>
            {note.tags.map((tag, index) => {
              return <div key={`tag_${index}`} className="tag">{tag.name + ', '}</div>
            })}
          </i>
        </div>
        <p>{note.body}</p>
      </Link>
    </div>
  )
};

export default NoteListElement;