import { useState } from "react";

const SelectorBar = ({ setShowCreated, setShowSaved }) => {
  const [showUnderline, setShowUnderline] = useState("saved");
  const [createdTabClassName, setCreatedTabClassName] = useState('unselected');
  const [savedTabClassName, setSavedTabClassName] = useState('');
  

  const selectCreated = () => {
    if (showUnderline === "saved") {
      setShowUnderline("created");
      setCreatedTabClassName("");
      setSavedTabClassName('unselected');
      setShowCreated(true);
      setShowSaved(false);
    }
  };

  const selectSaved = () => {
    if (showUnderline === "created") {
      setShowUnderline("saved");
      setSavedTabClassName("");
      setCreatedTabClassName('unselected');
      setShowSaved(true);
      setShowCreated(false);
    }
  }


  return (
    <div id="selector-bar-container">
      
      <div id="selector-bar">

        <div onClick={selectCreated} id="profile-created-tab-container">
            <div 
              id="profile-created-tab"
              className={createdTabClassName}
              >
              Created
            </div>
          {(showUnderline === "created") && 
            <div id="profile-created-underline" />}
        </div>

        <div onClick={selectSaved} id="profile-saved-tab-container">
            <div 
              id="profile-created-tab"
              className={savedTabClassName}
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