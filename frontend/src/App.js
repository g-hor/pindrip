import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';
import Navbar from './components/Navigation';
import Profile from './components/Profile';
import EditProfile from './components/Profile/EditProfile/EditProfileForm';
import EditAccountForm from './components/Profile/EditProfile/EditAccountForm';
import EditPersonalForm from './components/Profile/EditProfile/EditPersonalForm';
import CreatePinForm from './components/Pins/CreatePinForm';
import PinShow from './components/Pins/PinShow';

function App() {
  let currentUser = useSelector(getCurrentUser);

  return (
    <div id="entire-page">
      <Navbar />
      {/* <Switch>
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
        <Route exact path="/pins/:pinId">
          <PinShow />
        </Route>
        <Route exact path="/:username">
          <Profile />
        </Route>
      </Switch> */}
      <Routes>
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/editaccount" element={<EditPersonalForm />} />
        <Route exact path="/editaccount" element={<EditAccountForm />} />
        <Route exact path="/pin-builder" element={<CreatePinForm />} />
        <Route exact path="/pins/:pinId" element={<PinShow />} />
        <Route exact path="/:username" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
