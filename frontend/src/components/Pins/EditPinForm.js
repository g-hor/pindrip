import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './EditPinForm.css';
import { deletePin, fetchPin, updatePin } from '../../store/pin';

const EditPinForm = ({ pin, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(pin?.title);
  const [description, setDescription] = useState(pin?.description);
  const [website, setWebsite] = useState(pin?.website);
  const [altText, setAltText] = useState(pin?.altText);
  const cancelBtn = useRef();


  const savePin = async (pin) => {
    const updatedPin = { 
      id: pin.id,
      title: title, 
      description: description, 
      website: website, 
      altText: altText 
    };
    const res = await dispatch(updatePin(updatedPin));
    if (res.ok) {
      cancelBtn?.current?.click()
    };
  };

  useEffect(() => {
    dispatch(fetchPin(pin?.id));
  }, [dispatch]);

  return (
    <div id="edit-pin-form">

      <div id="edit-pin-form-title">
        Edit this Pin
      </div>

      <div id="edit-pin-form-bottom-container">

        <div id="edit-pin-form-left">
          <div className='edit-pin-row'>
            <div className='edit-pin-row-label'>
              Board
            </div>
            <div className='edit-pin-row-field'>
              {/* NEED TO IMPLEMENT AFTER BOARDS */}
              Boards
            </div>
          </div>

          <div id="edit-pin-underline" />

          <div className='edit-pin-row'>
            <div className='edit-pin-row-label'>
              Title
            </div>
            <div className='edit-pin-row-field'>
              <input
                type="text"
                value={title}
                className='edit-pin-text-input'
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
          </div>

          <div id="edit-pin-underline" />

          <div className='edit-pin-row'>
            <div className='edit-pin-row-label'>
              Description
            </div>
            <div className='edit-pin-row-field'>
              <textarea
                placeholder='Tell us about this Pin...'
                className='edit-pin-text-input'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                />
            </div>
          </div>
          
          <div id="edit-pin-underline" />

          <div className='edit-pin-row'>
            <div className='edit-pin-row-label'>
              Website
            </div>
            <div className='edit-pin-row-field'>
              <input
                type="text"
                value={website}
                className='edit-pin-text-input'
                onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
          </div>

          <div id="edit-pin-underline" />

          <div className='edit-pin-row'>
            <div className='edit-pin-row-label'>
              Alt text
            </div>
            <div className='edit-pin-row-field'>
              <input
                type="text"
                value={altText}
                className='edit-pin-text-input'
                onChange={(e) => setAltText(e.target.value)}
                />
            </div>
          </div>

        </div>


        <div id="edit-pin-form-right">
          <img 
            src={pin?.photo}
            alt={altText}
            id="edit-pin-img"
            />
        </div>
        
      </div>




      <div id="edit-pin-form-bottom-bar">
        <div 
          className='edit-pin-btn delete'
          onClick={() => dispatch(deletePin(pin?.id))}
          >
          Delete
        </div>

        <div id="edit-pin-bottom-btn-container">
          <div 
            ref={cancelBtn}
            className='edit-pin-btn cancel'
            onClick={() => onClose()}
            >
            Cancel
          </div>
          <div 
            className='edit-pin-btn save'
            onClick={() => savePin(pin)}
            >
            Save
          </div>
        </div>
      </div>

    </div>
  )
};

export default EditPinForm;