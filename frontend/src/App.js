import React, { useState, useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';

import './assets/styles/App.css';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem('authtoken')
      ? setLoggedIn(true)
      : setLoggedIn(false)

  }, [])

  function logout() {
    localStorage.removeItem('authtoken');
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <NavBar loggedIn={loggedIn} logout={logout} />
      <Switch>
        {/* <Route path='/' component={Home} /> */}
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;