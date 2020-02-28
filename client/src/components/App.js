import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch}  from 'react-router'
import logo from './logo.svg';
import './App.scss';
import Login from './Login-Register/Login.js';
import Register from './Login-Register/Register.js'
import Home from './Home/Home.js'

function App () {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path ='/'>
              <Login/>
              </Route>
              <Route path ='/login'>
              <Login />
            </Route> 
            <Route path ='/register'>
              <Register/>
            </Route>
            <Route path='/home'>
              <Home/>
            </Route>
            </Switch>
          </Router>
        </header>
      </div>
    );
    }
export default App;
