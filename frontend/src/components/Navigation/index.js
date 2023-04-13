import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { useEffect } from "react";
import { fetchAllUsers } from "../../store/user";
import { fetchAllPins } from "../../store/pin";
import LoggedNav from "./LoggedNav";
import UnauthNav from "./UnauthNav";
import './UnauthNav.css';
import './LoggedNav.css';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser); 

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch])

  return (
    <div className="nav-container">
      {!currentUser && <UnauthNav />}
      {currentUser && <LoggedNav />}
    </div>
  );
}; 

export default Navbar;