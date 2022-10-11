import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function LoginModalContent(props) {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("")

    const onUsernameInputChange = e => {
        setUsernameInput(e.target.value);
    };
    
    const onPasswordInputChange = e => {
        setPasswordInput(e.target.value);
    };

    const onSigninClick = async e => {
        if (usernameInput === "" || passwordInput === "") {
            setError("Please enter username and password!")
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
                    "http://localhost:3001/auth/login",
                    JSON.stringify(userData),
                    options
                )
                props.onHide()
                props.handleUserId(data.userId)
                props.handleUsername(data.username)

            } catch (err) {
                setError("Login Failed", err)
            }
        }
    };


    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">Login</Modal.Title>
            </Modal.Header>
       
            <Modal.Body className="block">
                <form  name="Login form">
                <label htmlFor="login-username"></label>
                    <input
                        id="login-username"
                        type="text"
                        required
                        placeholder="Username"
                        onChange={onUsernameInputChange}
                        aria-label="username input"
                    />
                    <label htmlFor="login-password"></label>
                    <input
                        id="login-password"
                        type="password"
                        required
                        placeholder="Password"
                        onChange={onPasswordInputChange}
                        aria-label="password input"
                    />
                </form>
                <div>{error}</div>
            </Modal.Body>
      
            <Modal.Footer>
                <div className="btnFootercontainer">
                <button onClick={onSigninClick}>
                    Sign in
                </button>
                <button onClick={props.handleShowSignup}>
                    Don't have an account? Signup
                </button>
                </div>
            </Modal.Footer>
        </>
    )
}

export default LoginModalContent;
