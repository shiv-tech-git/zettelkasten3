import './sidebar.css'

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Sidebar = () => {

  const myId = useSelector(state => state.auth.userData.userId)

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="logo">
          Z
        </div>
        <nav>
          <Link to="/note/create" className="btn">Create note</Link>
          <Link to={`/notes/user/${myId}`} className="btn">My notes</Link>
          <Link to={`/tags/user/${myId}`} className="btn">My tags</Link>
          <Link to="/users/all" className="btn">People</Link>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;