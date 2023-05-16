import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, receiveSession } from "../../../store/session";
import { updateUser, fetchUser } from "../../../store/user";
import { countryList } from "./CountryList";
import BottomBar from "./BottomBar";
import Sidebar from "./Sidebar";
import './EditPersonal.css';


const EditPersonalForm = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);
  const username = currentUser?.username;
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [country, setCountry] = useState(currentUser?.country || '');
  const [nonBinary, setNonBinary] = useState(!['Male', 'Female'].includes(gender));

  const selectCountry = (e) => {
    setCountry(e.target.value);
  };

  const resetChanges = () => {
    setGender(currentUser?.gender || '');
    setCountry(currentUser?.country || '');
  }

  const saveChanges = () => {
    dispatch(updateUser({ id: currentUser.id, username, gender, country }));
    dispatch(receiveSession({ ...currentUser, gender, country }));
  }

  useEffect(() => {
    dispatch(fetchUser(username));
  }, [dispatch, username, currentUser]);

  return (
    <div id="edit-profile-main-container">
      <div id="edit-profile-side-plus-form-holder">

        <Sidebar />
        
        <div id="edit-form-container">

          <div className="edit-form-header-container personal">
            <div>
              <h1 className="edit-form-title">
                Personal information
              </h1>
            </div>

            <div>
              <h3 className="edit-form-description">
                Edit your basic personal info. This information is private and wont show up in your public profile.
              </h3>
            </div>
          </div>


          <div className="edit-form-field-row-holder gender-row">
            <div className="edit-form-field-holder">
              <div className="edit-form-label">
                Gender
              </div>

              <div id="gender-options-holder">
                <div className="gender-option">
                  <input
                    type="radio"
                    // name="gender"
                    checked={gender === 'Male'}
                    onChange={() => {setGender("Male"); setNonBinary(false)}}
                  />
                  <div className="gender-option-text">Male</div>
                </div>

                <div className="gender-option">
                  <input
                    type="radio"
                    // name="gender"
                    checked={gender === 'Female'}
                    onChange={() => {setGender("Female"); setNonBinary(false)}}
                  />
                  <div className="gender-option-text">Female</div>
                </div>

                <div className="gender-option">
                  <input
                    type="radio"
                    // name="gender"
                    checked={nonBinary}
                    onChange={() => {setNonBinary(true); setGender('')}}
                  />
                  <div className="gender-option-text">Non-binary</div>
                </div>
              </div>

              {nonBinary && (
                <div className="edit-form-input">
                  <input
                    type="text"
                    className="edit-text-input-field gender-input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              )}
            </div>



          </div>

          <div className="edit-form-field-row-holder country-holder">
            <div className="edit-form-field-holder">
              <div className="edit-form-label">
                Country/Region
              </div>
              
              <div id="country-select-holder">
                <select 
                  onChange={selectCountry} 
                  name="country" 
                  value={country}
                  className="edit-text-input-field country-field"
                  >
                  {countryList.map(countryItem => (
                    <option value={countryItem} key={countryItem}>
                      {countryItem}
                    </option>
                  ))}
                </select>
                
                <i className="fa-solid fa-chevron-down country-dropbtn" />
              </div>
            </div>
          </div>

          <BottomBar 
            saveChanges={saveChanges}
            resetChanges={resetChanges}
          />

        </div>

      </div>

    </div>
  );
};

export default EditPersonalForm;