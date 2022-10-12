import React, { useState } from 'react';
import axios from "axios"
// import Button from "react-bootstrap/Button"

import HabitModal from "../HabitModal";
import styles from "./index.module.css"

function Habit({ habit, updateHabits }) {
    const [show, setShow] = useState(false);
    const [current, setCurrent] = useState(habit.current)
    const [completed, setCompleted] = useState(habit.completed)
    const [streak, setStreak] = useState(habit.streak)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePlusClicked = async e => {
        if (current < habit.goal) {
            e.target.setAttribute('disabled','')
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
            e.target.removeAttribute('disabled')
        }
    }

    const handleMinusClicked = async e => {
        if (current > 0) {
            e.target.setAttribute('disabled','')
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
                alert("Could not update habit", err)
            }
            e.target.removeAttribute('disabled')
        }
    }

    return(
        <>
        <div className={styles.fullContainer}>
        <div className={styles.habitContainer}>
            <button className={styles.habitButton} onClick={handleMinusClicked}>-</button>
            <button className={`${styles.habitButton} ${styles.mainHabitButton}`} style={completed ? {backgroundColor:'green'} : {}} onClick={handleShow}>
                {habit.title} {current}/{habit.goal}
            </button>
            <button className={styles.habitButton} onClick={handlePlusClicked}>+</button>
        </div>
        </div>

        <HabitModal habit={habit} current={current} completed={completed} streak={streak} show={show} onHide={handleClose} updateHabits={updateHabits} />
        </>
    )
}

export default Habit;
