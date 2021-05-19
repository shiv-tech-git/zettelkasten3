import './link-item.css';

import { Link } from 'react-router-dom';

const LinkItem = ({ itemId, name, edit=false, type, button_callback }) => {
  
  let link = '';
  switch(type) {
    case 'tag':
      link = `/notes/tag/${itemId}`
      break;
    case 'note':
      link = `/note/view/${itemId}`
      break;
    default:
      break;
  }
  
  if (edit) {
    return (
      <div className="link_item_wrapper">
        <div className="link_item_delete">
          <div className="name">{name}</div>
          { edit ? <div onClick={() => button_callback(itemId)} className="del_btn">X</div> : ''} 
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