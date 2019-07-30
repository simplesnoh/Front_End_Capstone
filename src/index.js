import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import TaskTussle from './components/TaskTussle'
import './index.css'
import * as firebase from 'firebase/app';
import { firebaseConfig } from './components/config/firebase'

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
      <TaskTussle />
  </Router>
  , document.getElementById('root'))
