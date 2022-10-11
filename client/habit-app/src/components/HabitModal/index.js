import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios"


function HabitModal(props) {

    const onDeleteClick = async () => {
        try {
            props.onHide()
            let url = `http://localhost:3001/habits/${props.habit.id}`
            await axios.delete(url)
            props.updateHabits()

        } catch (err) {
            alert('Could not delete habit', err)
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
        <Modal show={props.show} onHide={props.onHide} centered>   
            <Modal.Header closeButton>
                <Modal.Title>{props.habit.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Current Streak:</h4>
                <h4>{props.streak}</h4>
                <p>You have completed {props.current} out of your {props.habit.frequency.toLowerCase()} goal of {props.habit.goal} </p>
                {props.completed ? (
                    <p>Well done! You have completed your {props.habit.frequency.toLowerCase()} habit!</p>
                ) : null}
            </Modal.Body>

            <Modal.Footer>
                <OverlayTrigger
                  classname=""
                  trigger="click"
                  placement="top"
                  overlay={popover}
                  rootClose
                >
                <div className="btnFootercontainer">
                <button id="delete-habit-btn">
                    Delete Habit
                </button>
                </div>
                </OverlayTrigger>
            </Modal.Footer>

        </Modal>
    </>
  );
}

export default HabitModal
