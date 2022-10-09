import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import LoginModalContent from '../LoginModalContent';
import SignupModalContent from '../SignupModalContent';

function LoginModal() {
  const [show, setShow] = useState(false);
  const [showSignUp, setSignUp] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSignup = () => setSignUp(true)
  const handleShowLogin = () => setSignUp(false)

  return (
    <>
      <button onClick={handleShow}>
        Login / Signup
      </button>

      <Modal show={show} onHide={handleClose}>   
          {showSignUp ? (
            <SignupModalContent handleShowLogin={handleShowLogin} onHide={handleClose} />
          ) : (
            <LoginModalContent handleShowSignup={handleShowSignup} onHide={handleClose} />

          )} 
      </Modal>
    </>
  );
}

export default LoginModal
