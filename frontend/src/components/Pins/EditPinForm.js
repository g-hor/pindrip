import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EditPinForm.css';
import { deletePin, fetchPin, updatePin } from '../../store/pin';
import { fetchAllBoards } from '../../store/board';
import { getCurrentUser } from '../../store/session';
import { useParams } from 'react-router-dom';

const EditPinForm = ({ pin, onClose }) => {
  const dispatch = useDispatch();
  const { pinId } = useParams();
  const currentUser = useSelector(getCurrentUser);
  const boards = useSelector(state => Object.values(state?.boards));
  const [showBoards, setShowBoards] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]?.name || 'All Pins');
  let boardId = boards?.filter(board => board?.name === selectedBoard)[0]?.id;
  const [title, setTitle] = useState(pin?.title);
  const [description, setDescription] = useState(pin?.description);
  const [website, setWebsite] = useState(pin?.website);
  const [altText, setAltText] = useState(pin?.altText);
  const [saved, setSaved] = useState(false);
  const cancelBtn = useRef();
  let boardMenu = useRef();


  const savePin = async (pin) => {
    const updatedPin = { 
      id: pin.id,
      title: title, 
      description: description, 
      website: website, 
      altText: altText 
    };
    const res = await dispatch(updatePin(updatedPin));
    if (res?.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setTimeout(() => cancelBtn?.current?.click(), 3000);
    };

    savePin({ boardId, pinId });
  };

  const hideBoards = (e) => {
    if (e.target === boardMenu?.current) return;
    setShowBoards(false); 
  };

  useEffect(() => {
    dispatch(fetchPin(pin?.id));
    dispatch(fetchAllBoards(currentUser?.id));
  }, [dispatch, pin?.id, currentUser?.id]);

  useEffect(() => {
    if (!showBoards) return;

    document.addEventListener('click', hideBoards)

    return () => (document.removeEventListener('click', hideBoards));
  });



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
              <div id="show-pin-board-dropdown-btn" className='edit-pin-boards' onClick={() => setShowBoards(true)}>
                <i className="fa-solid fa-chevron-down dropbtn board-drop" />
                <div id="board-first-option">
                  {selectedBoard}
                </div>

                {showBoards && (
                  <div id="board-options-menu" ref={boardMenu}>
                    {boards?.map((board, i) => (
                      <div 
                        className="board-dropdown-option" 
                        key={i}
                        onClick={() => {setSelectedBoard(board.name); setShowBoards(false)}}
                        >
                        {board.name}
                      </div>
                    ))}
                  </div>
                  )}
              </div>
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

      <div id="saved-msg-container" className={saved ? "saved edit-pin" : "edit-pin"}>
        Drip saved successfully!
      </div>
    </div>
  )
};

export default EditPinForm;