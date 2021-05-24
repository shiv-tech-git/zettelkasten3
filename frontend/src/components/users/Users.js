import './users.css';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../utils/request';
import UserListElement from '../user-list-element/UserListElement';

const Users = () => {

  const [users, setUsers] = useState(null);

  useEffect( async () => {
    const users = await getAllUsers();
    setUsers(users);
  }, [])

  if (!users) return '';

  return (
    <div className="users_wrapper">
      {users.map(user => <UserListElement 
        key={user._id}
        name={user.username}
        uid={user._id}
        />)}
    </div>
  )
}

export default Users;