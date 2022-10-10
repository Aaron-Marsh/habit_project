import React from "react";

function Habit({ habit }) {
    return(
        <>
            <h3>{habit.title}</h3>
            <p>{habit.current}/{habit.goal}</p>
            <p>{habit.userId}</p>
        </>
    )
}

export default Habit;
