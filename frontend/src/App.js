import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';
import Navbar from './components/Navigation';
import Profile from './components/Profile';
import EditProfile from './components/Profile/EditProfile/EditProfileForm';
import EditAccountForm from './components/Profile/EditProfile/EditAccountForm';
import EditPersonalForm from './components/Profile/EditProfile/EditPersonalForm';
import CreatePinForm from './components/Pins/CreatePinForm';

function App() {
  let currentUser = useSelector(getCurrentUser);

  return (
    <div id="entire-page">
      <Navbar />
      <Switch>
        {(!currentUser) && <Redirect to="/" />}
        <Route exact path="/editprofile">
          <EditProfile />
        </Route>
        <Route exact path="/editpersonal">
          <EditPersonalForm />
        </Route>
        <Route exact path="/editaccount">
          <EditAccountForm />
        </Route>
        <Route exact path="/pin-builder">
          <CreatePinForm />
        </Route>
        <Route exact path="/:username">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
