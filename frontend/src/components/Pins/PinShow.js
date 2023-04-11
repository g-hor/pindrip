import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './PinShow.css';
import { Modal } from "../../context/modal";
import { useState } from "react";


const PinShow = () => {
  const { pinId } = useParams();
  const pin = useSelector(state => state.pins[parseInt(pinId)]);
  const [showModal, setShowModal] = useState(true);

  const hidePin = () => {
    setShowModal(false);
  }

  return (
    <>
    {showModal && (
      <Modal customClass={'pin-show-modal'} onClose={hidePin}>
        <div id="pin-show-container">

          <div id="pin-show-img-container">
            <img 
              src={pin?.photo} 
              alt={pin?.altText} 
              id="pin-show-img"
              />
          </div>

          <div id="pin-info-container">
            holder
          </div>

        </div>
      </Modal>)}
    </>
  )
};

export default PinShow;
