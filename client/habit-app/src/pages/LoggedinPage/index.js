import React, { useState, useEffect } from "react";

import HabitList from '../../components/HabitList'

function HabitsPage(props) {
    const logout = () => {
        window.location.reload(false)
    }
    return(
        <>
        <div className="login-header">
        <h2>Nice to see you, {props.username}</h2>
        <div>
        <button className="btnLogout" onClick={logout}>Logout</button>
        </div>
        </div>
        <HabitList userId={props.userId} />  
        </>
    )
}

export default HabitsPage;
