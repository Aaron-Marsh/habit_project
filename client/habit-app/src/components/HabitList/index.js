import React, { useState, useEffect } from "react";
import axios from "axios"

import Habit from "../Habit";

function HabitList(props) {
    const [habits, setHabits] = useState([])

    const fetchHabits = async () => {
        try {
            let url = `http://localhost:3001/habits/user/${props.userId}`
            const { data } = await axios.get(url)

            setHabits(data.habits)
        } catch (err) {
            throw new Error(err.message);
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    return(
        <>
            {habits.map(habit => (
                <div key={habit.id}>
                    <Habit habit={habit} />
                </div>
            ))}
        </>
    )
}

export default HabitList;
