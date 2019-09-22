import React, { useState, useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddBook from './pages/AddBook';
import Book from './pages/Book';
import Read from './pages/Read';

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
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/add/book' component={AddBook} />
        <Route exact path='/book/:id' component={Book} />
        <Route exact path='/read' component={Read} />
      </Switch>
    </div>
  );
}

export default App;