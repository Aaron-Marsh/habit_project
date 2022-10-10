import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios"


function HabitModal(props) {

    const onDeleteClick = async () => {
        try {
            console.log(props.habit.id)
            let url = `http://localhost:3001/habits/${props.habit.id}`
            await axios.delete(url)
            props.handleDeleteHabit()
            props.onHide()

        } catch (err) {
            throw new Error(err.message);
        }
    }

    const cancelDeleteClick = () => {
        document.getElementById("delete-habit-btn").click()
    }

    const popover = (
        <Popover id="test">
            <Popover.Body>
            <p>Are you sure? Once deleted, this habit cannot be restored! </p>
            <button onClick={cancelDeleteClick}>Don't Delete</button>
            <button onClick={onDeleteClick}>Confirm Delete</button>
          </Popover.Body>
        </Popover>
      );

  return (
    <>
        <Modal show={props.show} onHide={props.onHide}>   
            <Modal.Header closeButton>
                <Modal.Title>{props.habit.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Current Streak:</h4>
                <h4>{props.habit.streak}</h4>
                <p>You have completed {props.habit.current} out of your {props.habit.frequency} goal of {props.habit.goal} </p>
            </Modal.Body>

            <Modal.Footer>
                <OverlayTrigger
                  classname=""
                  trigger="click"
                  placement="top"
                  overlay={popover}
                  rootClose
                >
                <button id="delete-habit-btn">
                    Delete Habit
                </button>
                </OverlayTrigger>
            </Modal.Footer>

        </Modal>
    </>
  );
}

export default HabitModal
