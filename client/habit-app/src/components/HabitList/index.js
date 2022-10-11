import React, { useState, useEffect } from "react";
import axios from "axios"

import Habit from "../Habit";
import CreateHabitButton from "../CreateHabitButton";

function HabitList(props) {
    const [habits, setHabits] = useState({daily:[], weekly:[], monthly:[]})
    const [habitUpdate, setHabitUpdate] = useState(false)


    const fetchHabits = async () => {
        try {
            let url = `http://localhost:3001/habits/user/${props.userId}`
            const { data } = await axios.get(url)

            let sortedData = {daily:[], weekly:[], monthly:[]}
            data.habits.forEach(h => {
                if (h.frequency === "Daily") {
                    sortedData.daily.push(h)
                } else if (h.frequency === "Weekly") {
                    sortedData.weekly.push(h)
                } else if (h.frequency === "Monthly") {
                    sortedData.monthly.push(h)
                }
            })

            setHabits(sortedData)
                
        } catch (err) {
            alert(' Could not load habits, please refresh and try again!', err);
        }
    }

    const updateHabits = () => setHabitUpdate(!habitUpdate)

    useEffect(() => {
        fetchHabits()
    }, [habitUpdate])

    return(
        <>
            {habits.daily.length ? (<>
                <h2>Daily Habits</h2>
                {habits.daily.map(habit => (
                <div key={habit.id}>
                    <Habit habit={habit} updateHabits={updateHabits} />
                </div>
                ))}
            </>
            ) : null
            }
            {habits.weekly.length ? (<>
                <h2>Weekly Habits</h2>
                {habits.weekly.map(habit => (
                <div key={habit.id}>
                    <Habit habit={habit} updateHabits={updateHabits} />
                </div>
                ))}
            </>
            ) : null
            }
            {habits.monthly.length ? (<>
                <h2>Monthly Habits</h2>
                {habits.monthly.map(habit => (
                <div key={habit.id}>
                    <Habit habit={habit} updateHabits={updateHabits} />
                </div>
                ))}
            </>
            ) : null
            }
            <CreateHabitButton userId={props.userId} updateHabits={updateHabits} />
        </>
    )
}

export default HabitList;
