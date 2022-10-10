import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import LoginModalContent from '../LoginModalContent';
import SignupModalContent from '../SignupModalContent';

function HabitModal(props) {
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
        </Modal>
    </>
  );
}

export default HabitModal
