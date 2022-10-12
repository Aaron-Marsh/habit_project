import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"


function CreateHabitButton(props) {
    const [show, setShow] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [frequencyInput, setFrequencyInput] = useState("Frequency");
    const [goalInput, setGoalInput] = useState("");
    const [error, setError] = useState('');
 

    const onTitleInputChange = e => {
        setTitleInput(e.target.value);
    };
    const onFrequencyInputChange = e => {
        setFrequencyInput(e.target.value);
    };
    const onGoalInputChange = e => {
        setGoalInput(e.target.value);
    };


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmitClick = async e => {
        if (titleInput === "") {
            setError("Please give your habit a title!")
        } else if (frequencyInput === "Frequency") {
            setError("Please give your habit a frequency in which you want to hit a target!")
        } else if (goalInput < 1 || goalInput > 100) {
            setError("Please set a target between 1 and 100!")
        } else {
            try {
                setShow(false)
                let habitData = {
                    title: titleInput,
                    frequency: frequencyInput,
                    goal: goalInput,
                    userId: props.userId
                }
                let options = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                const { data } = await axios.post(
                    "http://localhost:3001/habits/new",
                    JSON.stringify(habitData),
                    options
                )
                props.updateHabits()
                setTitleInput("")
                setFrequencyInput("Frequency")
                setGoalInput("")

            } catch (err) {
                alert("Could not create a new habit", err)
            }
        }
    };

    return(
        <>
        <button className="btn" onClick={handleShow}>Make a new Habit</button>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className='modal-title'>Make a New Habit!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <input
                        type="text"
                        className='main-text'
                        required
                        placeholder="Habit title"
                        onChange={onTitleInputChange}
                        aria-label="title input"
                        maxLength={30}
                    />
                    <select className='main-text' required aria-label="frequency input" onChange={onFrequencyInputChange}>
                        <option defaultValue>Frequency</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                    <input
                        type="number"
                        className='main-text'
                        required
                        min={1}
                        max={100}
                        placeholder="Target to reach"
                        onChange={onGoalInputChange}
                        aria-label="goal input"
                        />
                </form>
                <div>{error}</div>
            </Modal.Body>

            <Modal.Footer>
                <div className="btnFootercontainer">
                <button className="btnFooter" onClick={onSubmitClick}>Make Habit</button>
                </div>
            </Modal.Footer>

        </Modal>
        </>
    )
}

export default CreateHabitButton;
