import React, { useState } from 'react';
// import Button from "react-bootstrap/Button"

import HabitModal from "../HabitModal";

function Habit({ habit }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <div style={{display:'inline-block', borderRadius:'8px', overflow:'hidden'}}>
            <button style={{borderRadius:'0px'}}>-</button>
            <button style={{borderRadius:'0px'}} onClick={handleShow}>
   
       {habit.title} {habit.current}/{habit.goal}
             
            </button>
            <button style={{borderRadius:'0px'}}>+</button>
        </div>
        <HabitModal habit={habit} show={show} onHide={handleClose} />
        </>
    )
}

export default Habit;
