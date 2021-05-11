import './header.css';

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions'
import { useHistory } from 'react-router-dom';

export default () => {

  const userName = useSelector(store => store.auth.userData.userName)
  const dispatch = useDispatch();
  let history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(logoutUser());
  }
  return (
    <div className="main_header">
      <div className="label">
        Zettelkasten
      </div>
      <div className="user_block">
        <p>Welcome {userName}</p>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}