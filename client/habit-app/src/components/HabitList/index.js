import React, { useState, useEffect } from "react";

function HabitList({ habits }) {
    return(
        <>
            {habits.map(habit => (
                <div key={habit.id}>
                    <h3>{habit.title}</h3>
                    <p>{habit.current}/{habit.goal}</p>
                </div>
            ))}
        </>
    )
}

export default HabitList;
