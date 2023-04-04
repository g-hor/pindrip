import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navigation';
import Profile from './components/Profile';

function App() {

  return (
    <>
      <Navbar />
      <Switch>
        {/* <Route path="/signup">
          <SignupFormModal />
        </Route> */}
        <Route exact path="/:username">
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
