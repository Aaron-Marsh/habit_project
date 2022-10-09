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
            Signup
            </Modal.Body>
      
            <Modal.Footer>
                <button onClick={props.handleShowLogin}>
                    Already have an account? Login
                </button>
            </Modal.Footer>
        </>
    )
}

export default SignupModalContent;
