import React from "react";
import LoginModal from '../../components/LoginModal'

function HomePage(props) {
    return(
        <>
            <h1>Habit Makers</h1>
            <p>Welcome to Habit Makers! If you want to live well everyday, then you need to get into some good habits! Habit Makers will help you stay on track and get into a great routine.</p>
            <p>How does it work? Choose your own habits that you want to track, set how many times you want to do it in a given time, and whenever you do it tell us! If you hit your target, we'll mark it as complete and add to your streak. How long can you keep it going?!</p>
            <LoginModal handleUserId={props.handleUserId} handleUsername={props.handleUsername} />

        </>
    )
}

export default HomePage;
