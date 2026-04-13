import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentUser } from '@store/session';
import { fetchAllUsers } from '@store/user';
import { useAppDispatch } from '@store/hooks';

import AuthNav from './AuthNav/AuthNav';
import UnauthNav from './UnauthNav/UnauthNav';

import './Navbar.css';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(getCurrentUser);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch, currentUser]);

	return <div className="nav-container">{currentUser ? <AuthNav /> : <UnauthNav />}</div>;
};

export default Navbar;
