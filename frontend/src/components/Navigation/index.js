import { useSelector } from "react-redux";
import LoggedNav from "./LoggedNav";
import UnauthNav from "./UnauthNav";
import './UnauthNav.css';
import './LoggedNav.css';
import './Navbar.css';

const Navbar = () => {
  const currentUser = useSelector(state => state.session.user); 

  return (
    <div className="nav-container">
      {currentUser && <LoggedNav />}
      {!currentUser && <UnauthNav />}
    </div>
  );
}; 

export default Navbar;