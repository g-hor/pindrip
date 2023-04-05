import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navigation';
import Profile from './components/Profile';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';

function App() {
  let currentUser = useSelector(getCurrentUser);

  // if (!currentUser) return <Redirect to="/" />

  return (
    <>
      <Navbar />
      <Switch>
        {(!currentUser) && <Redirect to="/" />}
        <Route exact path="/:username">
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
