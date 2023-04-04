import { useEffect, useState } from "react";
import './ProfileButton.css';
import DropdownMenu from "./DropdownMenu";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ProfileButton = ({ displayInitial, displayName }) => {
  const [showDrop, setShowDrop] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const clickShow = (e) => {
    if (showDrop) return;
    setShowDrop(true);
  }

  useEffect(() => {
    if (!showDrop) return;

    const clickHide = () => {
      setShowDrop(false);
    };

    document.addEventListener('click', clickHide);

    return () => document.removeEventListener('click', clickHide);
  }, [showDrop])

  return (
    <>
    <div className="right-drop-icon-holder dropdown" onClick={clickShow}>
      <i className="fa-solid fa-chevron-down dropbtn" />
    </div>
      {showDrop && (
        <DropdownMenu 
          onClick={(e) => e.stopPropagation()} 
          displayName={displayName} 
          displayInitial={displayInitial}
          />
      )}
    </>
  );
};

export default ProfileButton;