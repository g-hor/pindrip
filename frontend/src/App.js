import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';
import Navbar from './components/Navigation';
import Profile from './components/Profile';
import EditProfile from './components/Profile/EditProfile/EditProfileForm';
import EditAccountForm from './components/Profile/EditProfile/EditAccountForm';
import EditPersonalForm from './components/Profile/EditProfile/EditPersonalForm';
import CreatePinForm from './components/Pins/CreatePinForm';
import PinShow from './components/Pins/PinShow';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  let currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [navigate, currentUser]);

  return (
    <div id="entire-page">
      <Navbar />
      <Routes>
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/editpersonal" element={<EditPersonalForm />} />
        <Route exact path="/editaccount" element={<EditAccountForm />} />
        <Route exact path="/pin-builder" element={<CreatePinForm />} />
        <Route exact path="/pins/:pinId" element={<PinShow />} />
        <Route exact path="/:username" element={<Profile />} />
        <Route exact path="/" />
      </Routes>
    </div>
  );
};

export default App;
