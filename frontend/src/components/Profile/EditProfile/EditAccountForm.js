import { useDispatch, useSelector } from "react-redux";
import BottomBar from "./BottomBar";
import Sidebar from "./Sidebar";
import { getCurrentUser } from "../../../store/session";
import { useState } from "react";
import './EditAccount.css';
import { Modal } from "../../../context/modal";
import { deleteUser, updatePassword, updateUser } from "../../../store/user";


const EditAccountForm = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);
  const id = currentUser?.id;
  const username = currentUser?.username;
  const [email, setEmail] = useState(currentUser?.email);
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notMatch, setNotMatch] = useState(newPw !== confirmNewPw)
  const [errors, setErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState("");
  const isDemo = (id === 1);
  const [saved, setSaved] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);


  const handleEmail = (e) => {
    if (
      e.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) // CREDIT FOR REGEXP GOES TO 'rnevius' ("https://stackoverflow.com/users/3518452/rnevius")
    ) {
      setEmail(e.target.value);
      setEmailErrors('');
      setCanSubmit(true);
    } else {
      setEmail(e.target.value);
      setEmailErrors("Please enter a valid email");
      setCanSubmit(false);
    }
  };

  const handlePassword = () => {
    if (!notMatch) {
      return dispatch(updatePassword({ id, email, oldPw, newPw }))
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
          if (res?.ok) setShowPw(false);
        });
    };
  };

  const resetChanges = () => {
    setEmail(currentUser?.email);
    setCanSubmit(false);
  };

  const saveChanges = () => {
    if (!isDemo) {
      return dispatch(updateUser({
        id, email, username
      }))
        .then(async (res) => {
          if (res?.ok) {
            setErrors([]);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
          };
        })
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        })
    };
  };

  const handleDelete = () => {
    if (!notMatch) {
      setErrors([]);
      return dispatch(deleteUser({ id, username, email, newPw }))
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
    };
  };

  const closeReset = () => {
    setShowPw(false); 
    setNotMatch(false); 
    setOldPw(''); 
    setNewPw(''); 
    setConfirmNewPw('');
    setErrors([]);
  }


  return (
    <div id="edit-profile-main-container">
      <div id="edit-profile-side-plus-form-holder">

        <Sidebar />

        <div id="edit-form-container">

          <div className="edit-form-header-container">
            <div>
              <h1 className="edit-form-title">
                Account management
              </h1>
            </div>

            <div>
              <h3 className="edit-form-description">
                Make changes to your email and password. This information is private and won't show up in your public profile.
              </h3>
            </div>
          </div>

          <div className="edit-form-label">
            Email · Private
          </div>

          <input
            className={isDemo ? "edit-text-input-field email disabled" : "edit-text-input-field email"}
            disabled={isDemo ? true : false}
            type="text"
            value={email}
            onChange={handleEmail}
            />

          {emailErrors.length !== 0 && 
            <div className="edit-form-label valid-email">
              {emailErrors}
            </div>
            }

          <div className="edit-form-field-row-holder field-description account">
            {isDemo && "Sorry! The demo user's email cannot be changed."}
          </div>

          <div className="edit-form-label">
            Password
          </div>

          <div id="password-field-holder">
            <input
              className={isDemo ? "edit-text-input-field password disabled" : "edit-text-input-field password"}
              disabled={isDemo ? true : false}
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              onClick={() => setShowPw(true)}
              />

            <div 
              className={isDemo ? "change-pw-btn disabled" : "change-pw-btn"}
              onClick={() => setShowPw(true)}
              >
              Change
            </div>
          </div>

          <div className="edit-form-field-row-holder field-description account">
            {isDemo && "Sorry! The demo user's password cannot be changed."}
          </div>

          <div id="delete-acc-holder">
            <div id="delete-text-holder">
              <div id="delete-title">
                Delete your data and account
              </div>
              <div id="delete-description">
                Delete your account and account data
              </div>
            </div>

            <div 
              className={isDemo ? "change-pw-btn disabled" : "change-pw-btn"}
              onClick={() => setShowConfirm(true)}
              >
              Delete account
            </div>
          </div>

            {(!isDemo && showPw) && (
              <Modal onClose={closeReset} >
                <div id="change-pw-form-container">
                  <div className="edit-form-header-container">
                    <h1 className="edit-form-title pw-header">
                      Change your password
                    </h1>
                  </div>

                  <div className="edit-form-label">
                    Old password
                  </div>
                  <div className="password-field-holder">
                    <input
                      className="edit-text-input-field pw-modal-text"
                      type="password"
                      onChange={(e) => setOldPw(e.target.value)}
                      />
                  </div>

                  <div className="edit-form-label">
                    New password
                  </div>
                  <div className="password-field-holder">
                    <input
                      className="edit-text-input-field pw-modal-text"
                      type="password"
                      onChange={(e) => setNewPw(e.target.value)}
                      />
                  </div>

                  <div className="edit-form-label">Type it again</div>
                  <div className="password-field-holder">
                    <input
                      className="edit-text-input-field pw-modal-text"
                      type="password"
                      onChange={(e) => {setConfirmNewPw(e.target.value); setNotMatch(newPw !== e.target.value)}}
                      />
                  </div>
                  <div className="edit-form-label match-pw">
                    {errors.map(error => error)}
                  </div>
                  {notMatch && (
                    <div className="edit-form-label match-pw">
                      Passwords must match!
                    </div>
                    )}

                  <div id="pw-btn-holder">
                    <div 
                      className="change-pw-btn"
                      onClick={() => {setShowPw(false); setErrors([])}}
                      >
                      Cancel
                    </div>
                    <div 
                      className="change-pw-btn"
                      onClick={handlePassword}
                      >
                      Change Password
                    </div>
                  </div>
                </div>
              </Modal>
            )}

            {(!isDemo && showConfirm) && (
              <Modal onClose={closeReset}>
                <div id="confirm-delete-container">
                  <div className="edit-form-header-container">
                    <h1 className="edit-form-title pw-header">
                      We will miss your drip, {username}
                    </h1>
                  </div>

                  <div className="edit-form-label">
                      Enter your password
                  </div>
                  <div className="password-field-holder">
                    <input
                      className="edit-text-input-field pw-modal-text"
                      type="password"
                      onChange={(e) => {setNewPw(e.target.value); setNotMatch(confirmNewPw !== e.target.value)}}
                      />
                  </div>

                  <div className="edit-form-label">
                    Type it again
                  </div>
                  <div className="password-field-holder">
                    <input
                      className="edit-text-input-field pw-modal-text"
                      type="password"
                      onChange={(e) => {setConfirmNewPw(e.target.value); setNotMatch(newPw !== e.target.value)}}
                      />
                  </div>
                  <div className="edit-form-label match-pw">
                    {errors.map(error => error)}
                  </div>
                  {notMatch ? 
                    <div className="edit-form-label match-pw">
                      Passwords must match!
                    </div>
                    :
                    <div className="edit-form-label match-pw" />
                    }

                  <div id="pw-btn-holder">
                    <div 
                      className="change-pw-btn"
                      onClick={() => {setShowConfirm(false); setErrors([])}}
                      >
                      Cancel
                    </div>
                    <div 
                      className="change-pw-btn"
                      onClick={handleDelete}
                      >
                      Delete account
                    </div>
                  </div>
                </div>
              </Modal>
            )}

          <BottomBar 
            resetChanges={resetChanges}
            saveChanges={saveChanges}
            isDemo={isDemo}
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

export default EditAccountForm;
