import './EditPinForm.css';

const EditPinForm = ({ pin }) => {

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
                value={pin?.title}
                className='edit-pin-text-input'
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
                value={pin?.description}
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
                value={pin?.website}
                className='edit-pin-text-input'
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
                value={pin?.altText}
                className='edit-pin-text-input'
                />
            </div>
          </div>

        </div>


        <div id="edit-pin-form-right">
          <img 
            src={pin?.photo}
            alt={pin?.altText}
            id="edit-pin-img"
            />
        </div>
        
      </div>




      <div id="edit-pin-form-bottom-bar">

      </div>

    </div>
  )
};

export default EditPinForm;