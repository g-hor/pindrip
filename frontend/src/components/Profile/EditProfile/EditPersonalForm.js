import { useState } from "react";
import BottomBar from "./BottomBar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, receiveSession } from "../../../store/session";
import './EditPersonal.css';
import { updateUser } from "../../../store/user";


const EditPersonalForm = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);
  const id = currentUser.id;
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [country, setCountry] = useState(currentUser?.country || '');
  const [nonBinary, setNonBinary] = useState(['Male', 'Female'].includes(gender));
  const countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


  const selectCountry = (e) => {
    setCountry(e.target.value);
  };

  const resetChanges = () => {
    setGender(currentUser?.gender || '');
    setCountry(currentUser?.country || '');
  }

  const saveChanges = () => {
    dispatch(updateUser({id, gender, country}));
    dispatch(receiveSession({ ...currentUser, gender, country }));
  }


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
                    name="gender"
                    onClick={() => {setGender("Male"); setNonBinary(false)}}
                  />
                  <div className="gender-option-text">Male</div>
                </div>

                <div className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    onClick={() => {setGender("Female"); setNonBinary(false)}}
                  />
                  <div className="gender-option-text">Female</div>
                </div>

                <div className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    onClick={() => {setNonBinary(true); setGender('')}}
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
              
              <select 
                onChange={selectCountry} 
                name="country" 
                className="edit-text-input-field country-field"
                >
                {countryList.map(countryItem => (
                  <option value={countryItem}>
                    {countryItem}
                  </option>
                ))}
              </select>
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