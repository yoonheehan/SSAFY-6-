import React from "react"
import './App.css';
import NavBar from "./components/NavBar/NavBar.jsx"
import Withdraw from "./components/Withdraw/Withdraw.jsx";
import Alarm from "./components/Alarm/Alarm.jsx"
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="App">
      <NavBar/>
      </div>
      <div className="App container">
        <Routes>
          <Route path="/alarm" element={<Alarm/>} />
          <Route path="/withdraw" element={<Withdraw/>} /> 
        </Routes>
      </div>
    </>
  )
}

export default App;
