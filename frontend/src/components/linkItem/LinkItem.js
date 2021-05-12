import './link-item.css';

import { Link } from 'react-router-dom';

const LinkItem = ({ id, name, edit=false, type, button_callback }) => {
  
  let link = '';
  switch(type) {
    case 'tag':
      link = `/tag-view/${id}`
      break;
    case 'note':
      link = `/note-view/${id}`
      break;
    default:
      break;
  }
  
  if (edit) {
    return (
      <div className="link_item_wrapper">
        <div className="link_item_delete">
          <div className="name">{name}</div>
          { edit ? <div onClick={() => button_callback(id)} className="del_btn">X</div> : ''} 
        </div>
      </div>
  )
  } else {
    return (
      <Link to={link}>
        <div className="link_item_wrapper">
          <div className="link_item_link">
            <div className="name">{name}</div>
          </div>
        </div>
      </Link>
  )
  }
  
}

export default LinkItem;