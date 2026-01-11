import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './index.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Visitors from './components/Visitors';
import Maintenance from './components/Maintenance';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <br/><br/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/visitors" element={<Visitors/>}/>
        <Route path="/maintenance" element={<Maintenance/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
