import './note-list-item.css'

import { Link } from 'react-router-dom';

const NoteListElement = ({id, title, tags, body}) => {

  return (
    <div className="note_list_element">

      <Link to={`/note-view/${id}`}>
        <h3>{title}</h3>
        <div className="tags">
          Tags: 
          <i>
            {tags.map((tag, index) => {
              return <div key={`tag_${index}`} className="tag">{tag.name + ', '}</div>
            })}
          </i>
        </div>
        <p>{body}</p>
      </Link>
    </div>
  )
};

export default NoteListElement;