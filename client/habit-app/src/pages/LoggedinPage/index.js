import React, { useState, useEffect } from "react";

import HabitList from '../../components/HabitList'

function HabitsPage(props) {
    return(
        <>
        <h2>Nice to see you, {props.username}</h2>
        <HabitList userId={props.userId} />  
        </>
    )
}

export default HabitsPage;
