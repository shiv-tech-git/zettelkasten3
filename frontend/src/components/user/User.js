import './user.css';

import { useState, useEffect } from 'react';
import { getUser } from '../../utils/request';
import { Link } from 'react-router-dom';

const User = ({ match }) => {

  const [user, setUser] = useState(null);
  const uid = match.params.uid;

  useEffect( async () => {
    const user = await getUser(uid);
    setUser(user);
  }, [])

  if(!user) return '';

  return (
    <div className="user_info_wrapper">
      <p>Username: <strong>{user.username}</strong></p>
      <p>User info: </p>
      <div className="button_section">
        <Link to={`/notes/user/${user._id}`}>Notes</Link>
        <Link to={`/tags/user/${user._id}`}>Tags</Link>
      </div>
    </div>
  )
}

export default User;