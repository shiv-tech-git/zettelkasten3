import './note-form.css'

import LinkItem from '../linkItem/LinkItem';
import SearchInput from '../search-input/SearchInput';

import { fetchNoteHeads, fetchAllTags, postNote } from '../../utils/request';

import { useEffect, useState, useCallback } from 'react';

const NoteForm = ({note, formMode}) => {

  const [title, setTitle] = useState(note ? note.title : '');
  const [body, setBody] = useState(note ? note.body : '');
  const [tags, setTags] = useState(note ? note.tags : []);
  const [links, setLinks] = useState(note ? note.links : []);
  const [allTitles, setAllTitles] = useState([]);
  const [allTags, setAllTags] = useState([]);


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

  const loadTitles = async () => {
    const heads = await fetchNoteHeads();
    const titles = heads.map(head => {
      return {
        name: head.note.title,
        id: head.note.id
      }
    });
    setAllTitles(titles)
  }

  const addNewLink = (item) => {
    setLinks(links => [...links, {id: item.id, title: item.label}]);
  };

  const loadTags = async () => {
    const tags = await fetchAllTags();
    setAllTags(tags);
  }

  const addNewTag = (item) => {
    setTags(tag => [...tag, {id: item.id, name: item.label}]);
  };

  useEffect(() => {
    loadTitles();
    loadTags();
  }, [])

  const filterAutocompleteList = (autocomplete_list, selected_list) => {
    return autocomplete_list.filter((autocomplete_item) => {
      let leave_element = true;

      const selected_list_length = selected_list.length;
      for (let i = 0; i < selected_list_length; i++) {
        if (autocomplete_item.id == selected_list[i].id) {
          leave_element = false;
          break;
        }
      }
      return leave_element;
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const newNote = {
      action: formMode,
      note: {
        id: formMode === 'update' ? note.id : 'new',
        title,
        body,
        tags,
        links
      }
    }
    console.log(newNote)
    const result = await postNote(newNote);
    console.log('create response', result)
  }
  
  return (
    <div className="note_form_wrapper">
      <div className="note_form">
        <div className="form_title">
          {title ? title : "Create note"}
        </div>
        <form onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <input onChange={e => setTitle(e.target.value)} type="text" id="title" name="title" value={title}/>
          
          <div className="link_items_wrapper">
            <label htmlFor="tags">Tags:</label>
              {tags.map((tag, index) => {
                return <LinkItem 
                  key={"tag_" + index}
                  id={tag.id}
                  name={tag.name}
                  edit={true}
                  type='tag'
                  button_callback={deleteTag}
                />
              })}
          </div>
          <SearchInput 
            autocomplete_list={filterAutocompleteList(allTags, tags)}
            selectCallback={addNewTag}
            addNew={true}
          />

          <div className="link_items_wrapper">
            <label htmlFor="links">Links:</label>
              {links.map((note, index) => {
                return <LinkItem 
                  key={"link_" + index}
                  id={note.id}
                  name={note.title}
                  edit={true}
                  type='note'
                  button_callback={deleteLink}
                />
              })}
          </div>
          <SearchInput 
            autocomplete_list={filterAutocompleteList(allTitles, links)}
            selectCallback={addNewLink}
          />
          
          <label htmlFor="body">Body</label>
          <textarea onChange={e => setBody(e.target.value)} id="body" value={body}></textarea>


          <button type="submit">{formMode === 'update' ? 'Save' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;