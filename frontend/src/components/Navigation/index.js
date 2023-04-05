import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import LoggedNav from "./LoggedNav";
import UnauthNav from "./UnauthNav";
import './UnauthNav.css';
import './LoggedNav.css';
import './Navbar.css';

const Navbar = () => {
  const currentUser = useSelector(getCurrentUser); 

  return (
    <div className="nav-container">
      {currentUser && <LoggedNav />}
      {!currentUser && <UnauthNav />}
    </div>
  );
}; 

export default Navbar;