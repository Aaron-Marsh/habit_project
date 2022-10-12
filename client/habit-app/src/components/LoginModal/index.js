import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import LoginModalContent from '../LoginModalContent';
import SignupModalContent from '../SignupModalContent';

function LoginModal(props) {
  const [show, setShow] = useState(false);
  const [showSignUp, setSignUp] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSignup = () => setSignUp(true)
  const handleShowLogin = () => setSignUp(false)

  return (
    <>
      <button className='btn main-text' onClick={handleShow}>
        Login / Signup
      </button>

      <Modal show={show} onHide={handleClose} centered>   
          {showSignUp ? (
            <SignupModalContent handleShowLogin={handleShowLogin} onHide={handleClose} />
          ) : (
            <LoginModalContent handleShowSignup={handleShowSignup} onHide={handleClose} handleUserId={props.handleUserId} handleUsername={props.handleUsername} />

          )} 
      </Modal>
    </>
  );
}

export default LoginModal
