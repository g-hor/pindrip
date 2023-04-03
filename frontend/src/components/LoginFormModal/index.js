import LoginForm from "./LoginForm";
import { Modal } from "../../context/modal";
import { useState } from "react";
import './LoginForm.css';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  const showLogin = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const hideLogin = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <button className="login-btn" onClick={showLogin}>Log in</button>
      {showModal && (
        <Modal onClose={hideLogin}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;