import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function SignupModalContent(props) {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordInput2, setPasswordInput2] = useState("");
    const [error, setError] = useState("")

    const onUsernameInputChange = e => {
        setUsernameInput(e.target.value);
    };
    
    const onPasswordInputChange = e => {
        setPasswordInput(e.target.value);
    };
    const onPasswordInputChange2 = e => {
        setPasswordInput2(e.target.value);
    };

    const onRegisterClick = async e => {
        if (usernameInput === "" || passwordInput === "" || passwordInput2 === "") {
            setError("Please complete all fields!")
        } else if (passwordInput !== passwordInput2) {
            setError("Passwords do not match!")
        } else {
            try {
                let userData = {
                    username: usernameInput,
                    password: passwordInput
                }
                let options = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                const { data } = await axios.post(
                    "http://localhost:3001/auth/register",
                    JSON.stringify(userData),
                    options
                )
                setUsernameInput('')
                setPasswordInput('')
                setPasswordInput2('')
                
                setError(data.msg)

            } catch (err) {
                setError("Signup Failed", err)
            }
        }
    };

    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">Signup</Modal.Title>
            </Modal.Header>
       
            <Modal.Body>
                <form name="Registration form">
                    <label htmlFor="signup-username"></label>
                    <input
                        id="signup-username"
                        type="text"
                        value={usernameInput}
                        required
                        placeholder="Username"
                        onChange={onUsernameInputChange}
                        aria-label="username input"
                        />
                    <label htmlFor="signup-password"></label>
                    <input
                        id="signup-password"
                        type="password"
                        value={passwordInput}
                        required
                        placeholder="Password"
                        onChange={onPasswordInputChange}
                        aria-label="password input"
                        />
                    <label htmlFor="signup-password2"></label>
                    <input
                        id="signup-password2"
                        type="password"
                        value={passwordInput2}
                        required
                        placeholder="Confirm Password"
                        onChange={onPasswordInputChange2}
                        aria-label="confirm password input"
                        />
                </form>
                <div>{error}</div>
            </Modal.Body>
            <Modal.Footer>
                <div className="btnFootercontainer">
                <button onClick={onRegisterClick}>
                    Register
                </button>
                <button onClick={props.handleShowLogin}>
                    Already have an account? Login
                </button>
                </div>
            </Modal.Footer>
        </>
    )
}

export default SignupModalContent;
