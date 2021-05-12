import './note-form.css'

import LinkItem from '../linkItem/LinkItem';

import { useState } from 'react';

const NoteForm = ({note, button_label}) => {

  const [title, setTitle] = useState(note ? note.title : '');
  const [body, setBody] = useState(note ? note.body : '');
  const [tags, setTags] = useState(note ? note.tags : []);
  const [links, setLinks] = useState(note ? note.links : []);

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const bodyHandler = (e) => {
    setBody(e.target.value)
  }

  const deleteTag = (id) => {
    setTags(tags.filter((tag) => {
      return tag.id !== id;
    }))
  }

  const deleteLink = (id) => {
    setLinks(links.filter((link) => {
      return link.id !== id;
    }))
  }

  return (
    <div className="note_form_wrapper">
      <div className="note_form">
        <div className="form_title">
          {title ? title : "Create note"}
        </div>
        <form>
          <label htmlFor="title">Title</label>
          <input onChange={titleHandler} type="text" id="title" name="title" value={title}/>
          
          <div className="link_items_wrapper">
            <label htmlFor="tags">Tags:</label>
              {note ? tags.map((tag) => {
                return <LinkItem 
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  edit={true}
                  type='tag'
                  button_callback={deleteTag}
                />
              }) : ''}
          </div>
          <input type="text" id="tags" />

          <div className="link_items_wrapper">
            <label htmlFor="links">Links:</label>
              { note ? links.map((note) => {
                return <LinkItem 
                  key={note.id}
                  id={note.id}
                  name={note.title}
                  edit={true}
                  type='note'
                  button_callback={deleteLink}
                />
              }) : ''}
          </div>
          <input type="text" id="links" />
          
          <label htmlFor="body">Body</label>
          <textarea onChange={bodyHandler} id="body" value={body}></textarea>


          <button type="submit" type="submit">{button_label}</button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;