import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, receiveSession, storeCurrentUser } from "../../../store/session";
import { getInitial, updateUser, fetchUser, receiveUser } from "../../../store/user";
import { useState, useEffect, useRef } from "react";
import csrfFetch from "../../../store/csrf";
import Sidebar from "./Sidebar";
import BottomBar from "./BottomBar";
import Avatar from "../Avatar";
import { Modal } from "../../../context/modal";
import './EditProfile.css';


const EditProfileForm = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);
  const id = currentUser?.id;
  const [username, setUsername] = useState(currentUser?.username);
  const showUser = useSelector(state => state?.users[username]);
  const displayInitial = getInitial(currentUser);
  const [first, setFirst] = useState(currentUser?.firstName);
  const [last, setLast] = useState(currentUser?.lastName || '');
  const [about, setAbout] = useState(currentUser?.about || '');
  const [pronouns, setPronouns] = useState(currentUser?.pronouns || '');
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [avatar, setAvatar] = useState(showUser?.avatar);
  const [showPronouns, setShowPronouns] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [saved, setSaved] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const isDemo = (id === 1);
  let formData = new FormData();

  const imgBtn = useRef();
  const pronounsList = useRef();


  const handleChange = (setField, field, e) => {
    if (field === first) {
      setField(e.target.value);
      setCanSubmit(
        showUser.firstName !== e.target.value ||
        showUser.lastName !== last ||
        showUser.about !== about || 
        showUser.pronouns !== pronouns ||
        showUser.website !== website ||
        showUser.username !== username
        )
    } else if (field === last) {
      setField(e.target.value);
      setCanSubmit(
        showUser.lastName !== e.target.value ||
        showUser.firstName !== first ||
        showUser.about !== about || 
        showUser.pronouns !== pronouns ||
        showUser.website !== website ||
        showUser.username !== username
        )
    } else if (field === about) {
      setField(e.target.value);
      setCanSubmit(
        showUser.about !== e.target.value ||
        showUser.lastName !== last ||
        showUser.firstName !== first || 
        showUser.pronouns !== pronouns ||
        showUser.website !== website ||
        showUser.username !== username
        )
    } else if (field === pronouns) {
      setField(e.target.innerHTML);
      setCanSubmit(
        showUser.pronouns !== e.target.innerHTML ||
        showUser.lastName !== last ||
        showUser.about !== about || 
        showUser.firstName !== first ||
        showUser.website !== website ||
        showUser.username !== username
        )
    } else if (field === website) {
      setField(e.target.value);
      setCanSubmit(
        showUser.website !== e.target.value ||
        showUser.lastName !== last ||
        showUser.about !== about || 
        showUser.pronouns !== pronouns ||
        showUser.firstName !== first ||
        showUser.username !== username
        )
    } else if (field === username) {
      setField(e.target.value);
      setCanSubmit(
        showUser.username !== e.target.value ||
        showUser.lastName !== last ||
        showUser.about !== about || 
        showUser.pronouns !== pronouns ||
        showUser.website !== website ||
        showUser.firstName !== first
        )
    }
  };

  const handlePhoto = async ({ currentTarget }) => {
    if (currentTarget.files[0]) {
      formData.append('user[avatar]', currentTarget.files[0]);
      formData.append('user[id]', currentUser?.id);
    }

    const res = await csrfFetch(`/api/users/${currentUser?.id}`, {
      method: "PATCH",
      body: formData
    })

    if (res.ok) {
      setSaved(true);
      currentUser = await res.json();
      dispatch(receiveSession(currentUser));
      dispatch(receiveUser(currentUser));
      storeCurrentUser(currentUser);
      setAvatar(currentUser.avatar);
      setShowUpload(false);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const removePronouns = () => {
    setPronouns('');
    setCanSubmit(
      showUser.pronouns !== '' ||
      showUser.lastName !== last ||
      showUser.about !== about || 
      showUser.firstName !== first ||
      showUser.website !== website ||
      showUser.username !== username
    )
  };
  
  const showPronounsList = () => {
    if (showPronouns) return;
    setShowPronouns(true);
  };

  const selectPronoun = (e) => {
    handleChange(setPronouns, pronouns, e);
    setShowPronouns(false);
  };

  const resetChanges = (e) => {
    setFirst(showUser?.firstName);
    setLast(showUser?.lastName || '');
    setAbout(showUser?.about || '');
    setPronouns(showUser?.pronouns || '');
    setWebsite(showUser?.website || '');
    setUsername(showUser?.username);
  };

  const saveChanges = async () => {
    if (canSubmit) { 
      const res = await dispatch(updateUser({
        id, firstName: first, lastName: last, about, pronouns, website, username
        }));
      dispatch(receiveSession({ ...currentUser,
        firstName: first, lastName: last, about, pronouns, website, username
        }));
      
      if (res.ok) {
        setSaved(true);
      }
  
      setTimeout(() => setSaved(false), 3000);
    }
  };

  useEffect(() => {
    dispatch(fetchUser(username));
  }, [dispatch, username, currentUser.avatar]);
  
  useEffect(() => {
    if (!showPronouns) return;

    const hidePronouns = (e) => {
      if (pronounsList.current.contains(e.target)) return;
      setShowPronouns(false);
    };

    document.addEventListener('click', hidePronouns)

    return () => document.removeEventListener('click', hidePronouns);
  }, [
    showPronouns,
    first,
    last,
    about,
    pronouns,
    website,
    username
  ])


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
            {(avatar && (
              <div 
                className="avatar-holder"
                >
                <Avatar avatar={avatar} />
              </div>
              )) ||
            
            (!currentUser.avatar && (
              <div id="edit-form-initial">{displayInitial}</div>
              ))}

            <div 
              id="change-avatar-btn" 
              onClick={() => setShowUpload(true)}
              >
              Change
            </div>
          </div>

          {showUpload && (
            <Modal onClose={() => setShowUpload(false)}>
              <div id="upload-avatar-container">
                <div className="edit-form-header-container">
                  <h1 className="edit-form-title">
                    Change your picture
                  </h1>
                </div>

                <div 
                  id="upload-img-btn"
                  onClick={() => imgBtn.current.click()}
                  >
                  Choose photo
                </div>

                <input
                  ref={imgBtn}
                  type="file"
                  onChange={handlePhoto}
                  style={{display: 'none'}}
                  />
              </div>
            </Modal>
          )}

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
                  onChange={(e) => handleChange(setFirst, first, e)}
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
                  onChange={(e) => handleChange(setLast, last, e)}
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
                  onChange={(e) => handleChange(setAbout, about, e)}
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

              <div>
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

                  <i className="fa-solid fa-chevron-down pronoun-dropbtn" />
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
              </div>
              <div className="edit-form-field-row-holder field-description">
                Choose a set of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time.
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
                  onChange={(e) => handleChange(setWebsite, website, e)}
                  placeholder="Add a link to drive traffic to my GitHub :)"
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
                className={isDemo ? "edit-text-input-field website disabled" : "edit-text-input-field website"}
                disabled={isDemo ? true : false}
                type="text"
                value={username}
                onChange={(e) => handleChange(setUsername, username, e)}
                placeholder="Choose wisely so others can find you"
                />

                <div className="edit-form-field-row-holder field-description">
                  {isDemo ? "Sorry! The demo user's username cannot be changed." :
                    `www.pindrip.onrender.com/${username}`
                  }
                </div>
              </div>
            </div>
          </div>
          
          <BottomBar 
            resetChanges={resetChanges}
            saveChanges={saveChanges}
            canSubmit={canSubmit}
            />

          <div id="saved-msg-container" className={saved ? "saved profile-save" : "profile-save"}>
            Drip saved successfully!
          </div>
        </div>

      </div>

    </div>
  )
};

export default EditProfileForm;