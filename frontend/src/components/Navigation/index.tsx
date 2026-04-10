import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentUser } from '@store/session';
import { fetchAllUsers } from '@store/user';
import { useAppDispatch } from '@store/hooks';

import LoggedNav from './LoggedNav';
import UnauthNav from './UnauthNav';

import './UnauthNav.css';
import './LoggedNav.css';
import './Navbar.css';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(getCurrentUser);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch, currentUser]);

	return <div className="nav-container">{currentUser ? <LoggedNav /> : <UnauthNav />}</div>;
};

export default Navbar;
