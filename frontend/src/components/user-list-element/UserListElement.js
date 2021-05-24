import './user-list-element.css';

import { Link } from 'react-router-dom';

const UserListElement = ({ name, uid }) => {
  return (
    <div className="user_list_el_wrapper">
      <div className="user_account">
        <Link to={`/user/${uid}`}>{name}</Link>
      </div>
      <Link to={`/notes/user/${uid}`}>Notes</Link>
      <Link to={`/tags/user/${uid}`}>Tags</Link>
    </div>
  )
}

export default UserListElement;
