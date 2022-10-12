import React, { useState, useEffect } from 'react';

import { NotLoggedinPage, LoggedinPage } from './pages/index'
import './App.css';

function App() {
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')

  const handleUserId = userId => setUserId(userId)
  const handleUsername = username => setUsername(username)
  
  return (
    <>
      <div className='containerbg'>

        <div className='area'>
          <ul className='circles'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          </ul>
          <div className='frame'>
          {userId ? (
            <LoggedinPage userId={userId} username={username} />
            ) : (
            <NotLoggedinPage handleUserId={handleUserId} handleUsername={handleUsername} />
          )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
