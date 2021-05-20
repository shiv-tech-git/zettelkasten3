import './link-item.css';

import { Link } from 'react-router-dom';

const LinkItem = ({ link, itemId, name, edit=false, button_callback }) => {

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