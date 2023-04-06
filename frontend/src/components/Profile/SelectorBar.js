import { useState } from "react";

const SelectorBar = () => {
  const [showUnderline, setShowUnderline] = useState("saved");

  const selectCreated = () => {
    if (showUnderline === "saved") setShowUnderline("created");
  };

  const selectSaved = () => {
    if (showUnderline === "created") setShowUnderline("saved");
  }

  return (
    <div id="selector-bar-container">
      
      <div id="selector-bar">

        <div onClick={selectCreated} id="profile-created-tab-container">
            <div id="profile-created-tab">
              Created
            </div>
          {(showUnderline === "created") && 
            <div id="profile-created-underline" />}
        </div>

        <div onClick={selectSaved} id="profile-saved-tab-container">
            <div id="profile-created-tab">
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