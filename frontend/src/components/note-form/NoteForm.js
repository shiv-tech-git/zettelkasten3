import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNoteHeads, getUser } from '../../utils/request';
import LinkItem from '../link-item/LinkItem';
import SearchInput from '../search-input/__SearchInput';
import './note-form.css';




const NoteForm = ({note, formMode, submitCallback}) => {

  const [title, setTitle] = useState(note?.title ? note.title : '');
  const [body, setBody] = useState(note?.body ? note.body : '');
  const [tags, setTags] = useState(note?.tags ? note.tags : []);
  const [links, setLinks] = useState(note?.links ? note.links : []);
  const [allTitles, setAllTitles] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const myId = useSelector(state => state.auth.userData.userId)

  const deleteTag = (tagId) => {
    setTags(tags.filter((tag) => {
      return tag._id !== tagId;
    }))
  }

  const deleteLink = (linkId) => {

    const linksLength = links.length;
    for (let i = 0; i < linksLength; i++) {
      if (links[i].status === 'old' && links[i]._id === linkId) {
        links[i].status = 'deleted'
        setLinks([...links]);
        return;
      }
    }

    setLinks(links.filter((link) => {
      if (link?.status === 'new') {
        return link._id !== linkId;
      }
      return true;
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
    return titles;
  }

  const addNewLink = (item) => {
    const linksLength = links.length;
    for (let i = 0; i < linksLength; i++) {
      if (links[i].status === 'deleted' && links[i]._id === item._id) {
        links[i].status = 'old';
        setLinks([...links])
        return;
      }
    }

    setLinks(links => [...links, {_id: item._id, title: item.label, status: 'new'}]);
  };
  
  const loadTags = async () => {
    const userData = await getUser(myId);
    return userData.tags;
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
  };
  
  
  const filterAutocompleteList = (autocompleteList, selectedList) => {
    
    const filtered = [];
    
    autocompleteList.forEach( acItem => {
      
      const selectedLength = selectedList.length;
      
      for (let i = 0; i < selectedLength; i++) {
        //if old link was deleted but persists invisibly keep link in suggests
        if (selectedList[i]?.status === 'deleted' && acItem._id === selectedList[i]._id) {
          filtered.push(acItem);
          return;
        }
        //filter if item has been choosed already
        if (selectedList[i]._id === acItem._id) {
          return;
        }
      }
      //filter link if edit same note
      if (acItem._id == note?._id) {
        return;
      }
      filtered.push(acItem);
    })
    return filtered;
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
    // console.log(note)
    submitCallback(note);
  }
  
  useEffect(async () => {
    const [titles, tags] = await Promise.all([loadTitles(), loadTags()])
    setAllTitles(titles);
    setAllTags(tags);
  }, [])

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
                if (note.status === 'deleted') return '';
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