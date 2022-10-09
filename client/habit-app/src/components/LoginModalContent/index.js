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
                let userDetails = {
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
                    JSON.stringify(userDetails),
                    options
                )
                console.log(data)
                props.onHide()
                

            } catch (err) {
                if (!err.response) {
                    setError("No server Response! Please wait and try again")
                } else if (err.response.status === 401) {
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
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
       
            <Modal.Body>
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
            </Modal.Body>
      
            <Modal.Footer>
                <button onClick={props.handleShowSignup}>
                    Don't have an account? Signup
                </button>
            </Modal.Footer>
        </>
    )
}

export default LoginModalContent;
