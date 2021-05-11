import './sidebar.css'

import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <div className="logo">
          Z
        </div>
        <nav>
          <Link to="/create-note" className="btn">Create note</Link>
          <Link to="/" className="btn">My notes</Link>
          <Link to="/" className="btn">My tags</Link>
          <Link to="/" className="btn">People</Link>
        </nav>
      </div>
    </div>
  )
}