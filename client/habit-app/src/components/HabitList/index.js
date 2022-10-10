import React, { useState, useEffect } from "react";
import axios from "axios"

import Habit from "../Habit";
import CreateHabitButton from "../CreateHabitButton";

function HabitList(props) {
    const [habits, setHabits] = useState([])
    const [habitUpdate, setHabitUpdate] = useState(false)


    const fetchHabits = async () => {
        try {
            let url = `http://localhost:3001/habits/user/${props.userId}`
            const { data } = await axios.get(url)

            setHabits(data.habits)
        } catch (err) {
            throw new Error(err.message);
        }
    }

    const updateHabits = () => setHabitUpdate(!habitUpdate)

    useEffect(() => {
        fetchHabits()
    }, [habitUpdate])

    return(
        <>
            {habits.map(habit => (
                <div key={habit.id}>
                    <Habit habit={habit} />
                </div>
            ))}
            <CreateHabitButton userId={props.userId} updateHabits={updateHabits} />
        </>
    )
}

export default HabitList;
