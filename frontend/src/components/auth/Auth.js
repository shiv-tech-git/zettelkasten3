import './auth.css'

//REACT
import { useState } from 'react';
//REACT

//UTILS
import { loginRequest, registerRequest } from '../../utils/request';
//UTILS

//REDUX
import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux/actions';
//REDUX

export default () => {

  //REACT
  const [userName, setUserName] = useState('');
  const [passwd, setPasswd] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState('login');
  const [btnLabel, setBtnLabel] = useState('Login');
  const [status, setStatus] = useState('');

  //REDUX
  const dispatch = useDispatch();

  // const history = useHistory();

  const tabHandler = (e) => {
    let state = e.target.dataset.tab
    changeFormState(state)
    
  }

  const changeFormState = (state) => {
    switch(state) {
      case 'login':
        setBtnLabel('Login');
        setFormState('login');
        break;
      case 'register':
        setBtnLabel('Register')
        setFormState('register');
        break;
      default: 
        break;
    }
  }


  const formSubmit = async (e) => {
    e.preventDefault();
    let response;
    switch(formState) {
      case 'login':
        response = await loginRequest(userName, passwd);
        if (response.status === 'success') {
          delete response.status;
          dispatch(loginUser({...response}));
        }
        break;
      case 'register':
        response = await registerRequest(userName, email, passwd);
        if (response.status === 'success') {
          setStatus(<>You have successfully registered as <b>{response.userName}</b></>);
          changeFormState('login');
          setUserName('');
          setPasswd('');
          document.getElementById('userName').focus();
        }
        break;
      default: 
        break;
    }
  }


  const userNameChange = (e) => {
    setUserName(e.target.value);
  }

  const passwdChange = (e) => {
    setPasswd(e.target.value);
  }

  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div className="auth_wrapper">
      <div className="auth_form">
        <div className="status">{status}</div>
        <nav onClick={tabHandler} id='auth_nav'>
          <i className={formState === 'login' ? "active" : ""} data-tab='login'>Login</i>
          <i className={formState === 'register' ? "active" : ""} data-tab='register'>Register</i>
        </nav>
        <form onSubmit={formSubmit}>
          <label htmlFor="userName">Username</label>
          <input onChange={userNameChange} id='userName' type="text" value={userName}/>
          {formState === 'register' ? (<>
            <label htmlFor="email">Email</label>
            <input onChange={emailChange} type="email" id="email" value={email}></input>
            </>
          ) : ''}
          <label htmlFor="passwd">Password</label>
          <input onChange={passwdChange} id='passwd' type="text" value={passwd}/>
          <button id='auth_bnt' data-action="login" type='submit'>{btnLabel}</button>
        </form>
      </div>
    </div>
  )
}