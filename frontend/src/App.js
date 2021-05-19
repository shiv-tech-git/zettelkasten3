import './App.css';

//REACT
import { useState } from 'react';
//REACT

//COMPONENTS
import NoteCreate from './components/note-create/NoteCreate';
import Sidebar from './components/sidebar/Sidebar';
import NoteList from './components/note-list/NoteList';
import Auth from './components/auth/Auth';
import Header from './components/header/Header';
import Search from './components/search/Search';
import NoteView from './components/note-view/NoteView';
import NoteEdit from './components/note-edit/NoteEdit';
import TagView from './components/tag-view/TagView';
import UserNotes from './components/user-notes/UserNotes';
//COMPONENTS

//ROUTER
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//ROUTER

//REDUX
import { useSelector } from 'react-redux';
//REDUX

function App() {

  // const [userData, setUserData] = useState({});

  const isAuthorised = useSelector(state => state.auth.isAuthorised);

  if (!isAuthorised) {
    return <Auth />;
  }

  return (
    <BrowserRouter>
      <div className="main-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <Header/>
          <Search/>
          <div className="content">
            <Switch>
              <Route path='/notes/user/:id' exact component={UserNotes}/>
              <Route path='/note/create' component={NoteCreate} />
              <Route path='/note/view/:id' component={NoteView} />
              <Route path='/note/edit/:id' component={NoteEdit} />
              <Route path='/tag/view/:id' component={TagView} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
