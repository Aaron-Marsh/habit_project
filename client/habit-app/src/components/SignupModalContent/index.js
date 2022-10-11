import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function SignupModalContent(props) {
   

    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
       
            <Modal.Body>
            
            </Modal.Body>
                <form className="login">
                    <input
                        type="text"
                        required
                        placeholder="Username"
                        onChange={onUsernameInputChange}
                        aria-label="username input"
                    />
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        onChange={onPasswordInputChange}
                        aria-label="password input"
                    />
                </form>
                <button onClick={onSigninClick}>
                    Sign in
                </button>
                <div>{error}</div>
            <Modal.Footer>
                <button onClick={props.handleShowLogin}>
                    Already have an account? Login
                </button>
            </Modal.Footer>
        </>
    )
}

export default SignupModalContent;
