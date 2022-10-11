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
                setError("Success! You can now login to your account")

            } catch (err) {
                if (err.response.status === 401) {
                    setError("Login failed! Please check your username / password or register an account")
                } else {
                    setError("Login Failed")
                }
            }
        }
    };

    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
       
            <Modal.Body>
                <form style={{display:'block'}}>
                    <label htmlFor="signup-username"></label>
                    <input
                        id="signup-username"
                        type="text"
                        required
                        placeholder="Username"
                        onChange={onUsernameInputChange}
                        aria-label="username input"
                        />
                    <label htmlFor="signup-password"></label>
                    <input
                        id="signup-password"
                        type="password"
                        required
                        placeholder="Password"
                        onChange={onPasswordInputChange}
                        aria-label="password input"
                        />
                    <label htmlFor="signup-password2"></label>
                    <input
                        id="signup-password2"
                        type="password"
                        required
                        placeholder="Confirm Password"
                        onChange={onPasswordInputChange2}
                        aria-label="confirm password input"
                        />
                </form>
                <button onClick={onRegisterClick}>
                    Register
                </button>
                <div>{error}</div>
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
