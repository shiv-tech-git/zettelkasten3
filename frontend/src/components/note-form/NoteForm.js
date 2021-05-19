import './note-form.css'

import LinkItem from '../link-item/LinkItem';
import SearchInput from '../search-input/SearchInput';

import { getNoteHeads, getUser } from '../../utils/request';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const NoteForm = ({note, formMode, submitCallback}) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [body, setBody] = useState(note ? note.body : '');
  const [tags, setTags] = useState(note ? note.tags : []);
  const [links, setLinks] = useState(note ? note.links : []);
  const [allTitles, setAllTitles] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const myId = useSelector(state => state.auth.userData.userId)



  const deleteTag = (tagId) => {
    setTags(tags.filter((tag) => {
      return tag._id !== tagId;
    }))
  }

  const deleteLink = (linkId) => {
    console.log(linkId);
    setLinks(links.filter((link) => {
      return link._id !== linkId;
    }))
  }

  const loadTitles = async () => {
    const heads = await getNoteHeads(myId);
    const titles = heads.map(head => {
      return {
        name: head.title,
        _id: head._id
      }
    });
    setAllTitles(titles)
  }

  const addNewLink = (item) => {
    setLinks(links => [...links, {_id: item._id, title: item.label, status: 'new'}]);
  };

  const loadTags = async () => {
    const userData = await getUser(myId);
    setAllTags(userData.tags);
  }

  const addNewTag = (item) => {
    if (item._id === 'new') {
      const tagsLength = tags.length;
      for (let i = 0; i < tagsLength; i++) {
        if (tags[i].name === item.label) return;
      }
      setTags(tag => [...tag, {_id: `new_${item.label}`, name: item.label}]);
      return;
    }
    setTags(tag => [...tag, {_id: item._id, name: item.label}]);
    console.log('set tag', tags)
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
        if (autocomplete_item._id == selected_list[i]._id) {
          leave_element = false;
          break;
        }
      }
      return leave_element;
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    tags.forEach(tag => {
      if (tag._id.indexOf('new') > -1) tag._id = 'new';
    })
    const note = {
      title,
      body,
      tags,
      links
    }
    submitCallback(note);
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
                  itemId={tag._id}
                  name={tag.name}
                  edit={true}
                  type='tag'
                  button_callback={deleteTag}
                />
              })}
          </div>
          <SearchInput 
            key='tag_input'
            autocomplete_list={filterAutocompleteList(allTags, tags)}
            selectCallback={addNewTag}
            addNew={true}
          />

          <div className="link_items_wrapper">
            <label htmlFor="links">Links:</label>
              {links.map((note, index) => {
                return <LinkItem 
                  key={"link_" + index}
                  itemId={note._id}
                  name={note.title}
                  edit={true}
                  type='note'
                  button_callback={deleteLink}
                />
              })}
          </div>
          <SearchInput
            key='link_input' 
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