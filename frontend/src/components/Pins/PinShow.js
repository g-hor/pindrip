import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './PinShow.css';
import { Modal } from "../../context/modal";
import Avatar from "../Profile/Avatar";
import { useState } from "react";


const PinShow = () => {
  const { pinId } = useParams();
  const pin = useSelector(state => state.pins[parseInt(pinId)]);
  const [showModal, setShowModal] = useState(true);
  const creator = useSelector(state => state.users[pin?.creator]);


  const hidePin = () => {
    setShowModal(false);
  }

  debugger

  return (
    <>
    {showModal && pin && (
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

            <div id="pin-show-top-bar">
              <div id="ellipsis-btn">
                <i className="fa-solid fa-ellipsis" />
              </div>

              <div id="show-board-drop-save-btn-holder">
                <div id="show-pin-board-dropdown-btn">
                  Board name
                </div>
                <div 
                  id="show-pin-save-btn"
                  // onClick={}
                  >
                  Save
                </div>
              </div>
            </div>

            <div id="pin-show-website">
              {/* {pin?.website} */}
              <a href="google.com">google.com</a>
            </div>

            <div id="pin-show-title">
              {pin?.title}
            </div>

            <div id="pin-show-description">
              {/* {pin?.description} */}
              this is a description Más de 500 Novedades Diarias✓Autodevoluciones✓Envío gratis a partir de 29€✓Pulsa para ver los detalles de Jersey con patrón de rayas de hombros caídos. Compra tus favoritos y entérate de toda la infromación.Más de 500 Novedades Diarias✓Autodevoluciones✓Envío gratis a partir de 29€✓Pulsa para ver los detalles de Jersey con patrón de rayas de hombros caídos. Compra tus favoritos y entérate de toda la infromación.Más de 500 Novedades Diarias✓Autodevoluciones✓Envío gratis a partir de 29€✓Pulsa para ver los detalles de Jersey con patrón de rayas de hombros caídos. Compra tus favoritos y entérate de toda la infromación.Novedades Diarias✓Autodevoluciones✓Envío gratis a partir de 29€✓Pulsa para ver los detalles de Jersey con patrón de rayas de hombros caídos. Compra tus favoritos y entérate de toda la infromación.Más de 500 Novedades Diarias✓Autodevoluciones✓Envío gratis a partir de 29€✓Pulsa para ver los detalles de Jersey con patrón de rayas de hombros caídos. Compra tus favoritos y entérate de toda la infromación.Más de 500 Novedades Diarias✓Autodevoluciones✓Envío gratis a partir de 29€✓Pulsa para ver los detalles de Jersey con patrón de rayas de hombros caídos. Compra tus favoritos y entérate de toda la infromación
            </div>

            <div id="pin-show-creator-info">
              <div id="create-pin-user-info">
                <Avatar avatar={creator?.avatar} />
                <div>{creator?.firstName + ' ' + (creator?.lastName || '')}</div>
              </div>
            </div>

          </div>

        </div>
      </Modal>)}
    </>
  )
};

export default PinShow;
