import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from '../../store/session';

const DropdownMenu = ({ displayInitial, displayName }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  };


  return (
    <div className="dropdown-content">
    <div>Currently logged in as:</div>
    <div>
      <div>
        <div>{displayInitial}</div>
        <div>
          <div>{displayName}</div>
          <div>{currentUser.email}</div>
        </div>
      </div>
    </div>
    <div>More options</div>
    <div onClick={clickLogout}>Log out</div>
  </div>
  );
};

export default DropdownMenu;