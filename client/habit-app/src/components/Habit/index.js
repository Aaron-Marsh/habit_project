import React, { useState } from 'react';
import axios from "axios"
// import Button from "react-bootstrap/Button"

import HabitModal from "../HabitModal";
import styles from "./index.module.css"

function Habit({ habit }) {
    const [show, setShow] = useState(false);
    const [showHabit, setShowHabit] = useState(true)
    const [current, setCurrent] = useState(habit.current)
    const [completed, setCompleted] = useState(habit.completed)
    const [streak, setStreak] = useState(habit.streak)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDeleteHabit = () => setShowHabit(false);

    const handlePlusClicked = async () => {
        if (current < habit.goal) {
            try {
                setCurrent(prevState => prevState + 1)
                if (current === habit.goal - 1) {
                    setCompleted(true)
                    setStreak(prevState => prevState + 1)
                }
                let habitData = {
                    id: habit.id,
                    command: 1
                }
                let options = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const { data } = await axios.patch(
                    `http://localhost:3001/habits/${habit.id}`,
                    JSON.stringify(habitData),
                    options
                )
            } catch(err) {
                alert("Could not update habit")
            }
        }
    }

    const handleMinusClicked = async () => {
        if (current > 0) {
            try {
                setCurrent(prevState => prevState - 1)
                if (completed) {
                    setCompleted(false)
                    setStreak(prevState => prevState - 1)
                }
                let habitData = {
                    id: habit.id,
                    command: -1
                }
                let options = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const { data } = await axios.patch(
                    `http://localhost:3001/habits/${habit.id}`,
                    JSON.stringify(habitData),
                    options
                )
            } catch(err) {
                alert("Could not update habit")
            }
        }
    }

    return(
        <>
        {showHabit ? (<>
        <div className={styles.habitContainer}>

            <button className={styles.habitButton} onClick={handleMinusClicked}>-</button>
            <button className={`${styles.habitButton} ${styles.mainHabitButton}`} style={completed ? {backgroundColor:'green'} : {}} onClick={handleShow}>
                {habit.title} {current}/{habit.goal}
            </button>
            <button className={styles.habitButton} onClick={handlePlusClicked}>+</button>

        </div>
        </>) : null}
        <HabitModal habit={habit} current={current} completed={completed} streak={streak} show={show} onHide={handleClose} handleDeleteHabit={handleDeleteHabit} />
        </>
    )
}

export default Habit;
