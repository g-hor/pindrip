import SignupForm from "./SignupForm";
import { Modal } from "../../context/modal";
import { useState } from "react";


const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  const showSignup = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const hideSignup = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <button className="signup-btn" onClick={showSignup}>Sign up</button>
      {showModal && (
        <Modal onClose={hideSignup}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;