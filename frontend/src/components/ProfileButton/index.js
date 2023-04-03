import { useEffect, useState } from "react";
import './ProfileButton.css';
import DropdownMenu from "./DropdownMenu";

const ProfileButton = () => {
  const [showDrop, setShowDrop] = useState(false);

  const clickShow = (e) => {
    if (showDrop) return;
    setShowDrop(true);
  }

  useEffect(() => {
    if (!showDrop) return;

    const clickHide = () => {
      setShowDrop(false);
    };

    const profileButton = document.querySelector('.dropdown');
    document.addEventListener('click', function(e) {
      if (e.currentTarget !== profileButton) {
        clickHide();
      }
    });

    document.addEventListener('click', clickHide);

    return () => document.removeEventListener('click', clickHide);
  }, [showDrop])

  return (
    <div className="dropdown" onClick={clickShow}>
      <i className="fa-solid fa-chevron-down dropbtn" />
      {showDrop && (
        <DropdownMenu />
      )}
    </div>
  );
};

export default ProfileButton;