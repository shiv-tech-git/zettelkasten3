import "./App.css";

//REACT
import { useState, useEffect } from "react";
//REACT

//COMPONENTS
import NoteCreate from "./components/note-create/NoteCreate";
import Sidebar from "./components/sidebar/Sidebar";
import Auth from "./components/auth/Auth";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import NoteView from "./components/note-view/NoteView";
import NoteEdit from "./components/note-edit/NoteEdit";
import UserTags from "./components/user-tags/UserTags";
import UserNotes from "./components/user-notes/UserNotes";
import TagNotes from "./components/tag-notes/TagNotes";
import Users from "./components/users/Users";
import User from "./components/user/User";
//COMPONENTS

//ROUTER
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
//ROUTER

//REDUX
import { useSelector } from "react-redux";
//REDUX

const Logged = () => {
  const history = useHistory();
  const isAuthorised = useSelector((state) => state.auth.isAuthorised);

  useEffect(() => {
    if (!isAuthorised) {
      history.push("/auth");
    }
  }, [isAuthorised]);

  if (!isAuthorised) return null;

  return (
    <div className="main-wrapper">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="content-wrapper">
        <Header />
        <Search />
        <div className="content">
          <Switch>
            <Route path="/notes/user/:uid" exact component={UserNotes} />
            <Route
              path="/notes/user/:uid/tag/:tid"
              exact
              component={TagNotes}
            />
            <Route path="/note/create" component={NoteCreate} />
            <Route path="/note/view/:nid" component={NoteView} />
            <Route path="/note/edit/:nid" component={NoteEdit} />
            <Route path="/tags/user/:uid" component={UserTags} />
            <Route path="/users/all" component={Users} />
            <Route path="/user/:uid" component={User} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" component={Logged} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
