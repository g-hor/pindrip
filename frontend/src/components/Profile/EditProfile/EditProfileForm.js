import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../store/session";
import { getInitial } from "../../../store/user";
import Sidebar from "./Sidebar";
import './EditProfile.css';
import { useState, useEffect, useRef } from "react";


const EditProfileForm = () => {
  const currentUser = useSelector(getCurrentUser);
  const displayInitial = getInitial(currentUser);
  const [first, setFirst] = useState(currentUser?.firstName);
  const [last, setLast] = useState(currentUser?.lastName);
  const [about, setAbout] = useState(currentUser?.about);
  const [pronouns, setPronouns] = useState(currentUser?.pronouns);
  const [website, setWebsite] = useState(currentUser?.website);
  const [username, setUsername] = useState(currentUser?.username);
  const [showPronouns, setShowPronouns] = useState(false);

  const pronounsList = useRef()

  const removePronouns = () => {
    setPronouns('');
  };
  
  const showPronounsList = () => {
    if (showPronouns) return;
    setShowPronouns(true);
  };

  const selectPronoun = (e) => {
    setPronouns(e.target.innerHTML);
    setShowPronouns(false);
  };

  useEffect(() => {
    if (!showPronouns) return;

    const hidePronouns = (e) => {
      if (pronounsList.current.contains(e.target)) return;
      setShowPronouns(false);
    };

    document.addEventListener('click', hidePronouns)

    return () => document.removeEventListener('click', hidePronouns);
  }, [showPronouns])

  return (
    <div id="edit-profile-main-container">
      <div id="edit-profile-side-plus-form-holder">

        <Sidebar />

        <div id="edit-form-container">

          <div className="edit-form-header-container">
            <div>
              <h1 className="edit-form-title">
                Public profile
              </h1>
            </div>

            <div>
              <h3 className="edit-form-description">
                People visiting your profile will see the following info
              </h3>
            </div>
          </div>

          <div className="edit-form-label">
            Photo
          </div>

          <div className="edit-form-field-row-holder">
            <div id="edit-form-initial">{displayInitial}</div>

            <div id="change-avatar-btn">Change</div>
          </div>

          <div className="edit-form-field-row-holder">

            <div className="edit-form-field-holder">
              <div className="edit-form-label">
                First name
              </div>

              <div className="edit-form-input">
                <input
                  className="edit-text-input-field"
                  type="text"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  />
              </div>
            </div>

            <div className="edit-form-field-holder">
              <div className="edit-form-label">
                  Last name
              </div>

              <div className="edit-form-input">
                <input
                  className="edit-text-input-field"
                  type="text"
                  value={last}
                  onClick={(e) => setLast(e.target.value)}
                  />
              </div>
            </div>

          </div>

          <div className="edit-form-field-row-holder">
            <div className="edit-form-field-holder">
              <div className="edit-form-label">
                About
              </div>

              <div className="edit-form-input">
                <textarea
                  className="edit-text-input-field textarea"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell your story"
                  />
              </div>
            </div>
          </div>

          <div className="edit-form-field-row-holder">
            <div className="edit-form-field-holder">
              <div className="edit-form-label">
                Pronouns
              </div>

              <div className="edit-form-input">
                <div
                  className={
                    showPronouns ? "edit-text-input-field clicked-pronouns" : "edit-text-input-field pronouns"
                  }
                  onClick={showPronounsList}
                  >
                  {pronouns && (
                  <div id="selected-pronouns">
                    <div>{pronouns}</div>
                    <div id="remove-pronouns">
                      <i 
                        className="fa-solid fa-xmark"
                        onClick={removePronouns}
                        />
                    </div>
                  </div>)}
                </div>

                <div ref={pronounsList}>
                  {showPronouns && (
                    <div id="pronouns-list">
                      <div className="pronoun-option" onClick={selectPronoun}>ey/em</div>
                      <div className="pronoun-option" onClick={selectPronoun}>he/him</div>
                      <div className="pronoun-option" onClick={selectPronoun}>ne/nem</div>
                      <div className="pronoun-option" onClick={selectPronoun}>she/her</div>
                      <div className="pronoun-option" onClick={selectPronoun}>they/them</div>
                      <div className="pronoun-option" onClick={selectPronoun}>ve/ver</div>
                      <div className="pronoun-option" onClick={selectPronoun}>xe/xem</div>
                      <div className="pronoun-option" onClick={selectPronoun}>xie/xem</div>
                      <div className="pronoun-option" onClick={selectPronoun}>ze/zir</div>
                    </div>)}
                </div>
                <div className="edit-form-field-row-holder field-description">
                  Choose a set of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time.
                </div>
              </div>
            </div>
          </div>

          <div className="edit-form-field-row-holder website">
            <div className="edit-form-field-holder">
              <div className="edit-form-label">
                Website
              </div>

              <div className="edit-form-input">
                <input
                  className="edit-text-input-field website"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Add a link to drive traffic to your site"
                  />
              </div>
            </div>
          </div>

          <div className="edit-form-field-row-holder">
            <div className="edit-form-field-holder">
              <div className="edit-form-label">
                Username
              </div>

              <div className="edit-form-input">
              <input
                className="edit-text-input-field website"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Add a link to drive traffic to your site"
                />

                <div className="edit-form-field-row-holder field-description">
                  {`www.pindrip.onrender.com/${username}`}
                </div>
              </div>
            </div>
          </div>
          
          






        </div>

      </div>

    </div>
  )
};

export default EditProfileForm;