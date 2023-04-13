import { useState } from "react";

const SelectorBar = ({ setShowCreated, setShowSaved }) => {
  const [showUnderline, setShowUnderline] = useState("saved");

  const selectCreated = () => {
    if (showUnderline === "saved") setShowUnderline("created");
    setShowCreated(true);
    setShowSaved(false);
  };

  const selectSaved = () => {
    if (showUnderline === "created") setShowUnderline("saved");
    setShowSaved(true);
    setShowCreated(false);
  }

  return (
    <div id="selector-bar-container">
      
      <div id="selector-bar">

        <div onClick={selectCreated} id="profile-created-tab-container">
            <div 
              id="profile-created-tab"
              className={showUnderline === "saved" && "unselected"}
              >
              Created
            </div>
          {(showUnderline === "created") && 
            <div id="profile-created-underline" />}
        </div>

        <div onClick={selectSaved} id="profile-saved-tab-container">
            <div 
              id="profile-created-tab"
              className={showUnderline === "created" && "unselected"}
              >
              Saved
            </div>
          {(showUnderline === "saved") && 
            <div id="profile-saved-underline" />}
        </div>

      </div>

    </div>
  )
};

export default SelectorBar;