import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navigation';
import Profile from './components/Profile';
import EditProfile from './components/Profile/EditProfile';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';

function App() {
  let currentUser = useSelector(getCurrentUser);

  return (
    <>
      <Navbar />
      <Switch>
        {(!currentUser) && <Redirect to="/" />}
        <Route exact path="/editprofile">
          <EditProfile />
        </Route>
        <Route exact path="/:username">
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
