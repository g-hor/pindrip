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
      <Routes>
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editpersonal" element={<EditPersonalForm />} />
        <Route path="/editaccount" element={<EditAccountForm />} />
        <Route path="/pin-builder" element={<CreatePinForm />} />
        <Route path="/pins/:pinId" element={<PinShow />} />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
