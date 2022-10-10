import React, { useState, useEffect } from "react";
import axios from "axios"

import HabitList from '../../components/HabitList'
import LoginModal from '../../components/LoginModal'

function HabitsPage() {
    // const [habits, setHabits] = useState([]);
    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')

    const handleUserId = userId => setUserId(userId)
    const handleUsername = username => setUsername(username)

    // const fetchHabits = async () => {
    //     try {
    //         let url = "http://localhost:3001/habits/user/629f8820a84519212982bb30"
    //         const { data } = await axios.get(url)

    //         setHabits(data.habits)
    //     } catch (err) {
    //         throw new Error(err.message);
    //     }
    // }

    // useEffect(() => {
    //     fetchHabits()
    // }, [])

    return(
        <>
        <h2>HabitsPage</h2>
        {userId ? (
        <HabitList userId={userId} />
        ) : (
        <>
        <p>logged out</p>
        <LoginModal handleUserId={handleUserId} handleUsername={handleUsername} />
        </>
        )}
        
        </>
    )
}

export default HabitsPage;
