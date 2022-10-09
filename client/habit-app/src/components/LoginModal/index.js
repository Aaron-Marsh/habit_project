import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function LoginModal() {
  const [show, setShow] = useState(false);
  const [showSignUp, setSignUp] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSignUp = () => setSignUp(true)
  const handleShowLogin = () => setSignUp(false)

  return (
    <>
      <button onClick={handleShow}>
        Login / Signup
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login/Signup</Modal.Title>
        </Modal.Header>
        {showSignUp ? (
        <Modal.Body>Sign Up!</Modal.Body>
        ) : (
            <Modal.Body>Log In!</Modal.Body>
        )}
        

        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={handleClose}>
            Save Changes
          </button>
          {showSignUp ? (
            <button onClick={handleShowLogin}>
                Already have an account? Login
            </button>
          ) : (
            <button onClick={handleShowSignUp}>
                Don't have an account? Create account
            </button>
          )}
          

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal
