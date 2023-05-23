import logo from './logo.svg';
import React,{useState, useEffect} from 'react'

import {
  Routes,
  Route,
  useSearchParams,
  BrowserRouter
} from "react-router-dom"
import Dashboard from './pages/Dashboard';
import './App.css';
import Login from "./pages/Login"
import Para from "./components/Para"
import AdminDashboard from './pages/AdminDashboard';



function App() {


  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/AdminDashboard" element={<AdminDashboard/>}/>

        </Routes>
      {/* <Para /> */}
    </div>
  );
}

export default App;
