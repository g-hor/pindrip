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
import PinIndex from './components/Pins/PinIndex';
import SplashPage from './components/Splash';

function App() {
  const navigate = useNavigate();
  let currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (!currentUser) navigate('/home');
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
        <Route exact path="/home" element={<PinIndex />} />
        <Route exact path="/" element={<SplashPage />} />
      </Routes>
    </div>
  );
};

export default App;
