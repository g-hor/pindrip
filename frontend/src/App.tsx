import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getCurrentUser } from './store/session';

import Navbar from './components/Navigation';
import Profile from './components/Profiles';
import EditProfile from './components/Profiles/EditProfile/EditProfileForm';
import EditAccountForm from './components/Profiles/EditProfile/EditAccountForm';
import EditPersonalForm from './components/Profiles/EditProfile/EditPersonalForm';
import CreatePinForm from './components/Pins/Create/CreatePinForm';
import PinShow from './components/Pins/Show/PinShow';
import PinIndex from './components/Pins/Index/PinIndex';
import SplashPage from './components/Splash';
import BoardShow from './components/Profiles/Boards/BoardShow';

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
				<Route path="/editprofile" element={<EditProfile />} />
				<Route path="/editpersonal" element={<EditPersonalForm />} />
				<Route path="/editaccount" element={<EditAccountForm />} />
				<Route path="/pin-builder" element={<CreatePinForm />} />
				<Route path="/pins/:pinId" element={<PinShow />} />
				<Route path="/:username/:boardUrl" element={<BoardShow />} />
				<Route path="/:username" element={<Profile />} />
				<Route path="/home" element={<PinIndex />} />
				<Route path="/" element={<SplashPage />} />
			</Routes>
		</div>
	);
}

export default App;
