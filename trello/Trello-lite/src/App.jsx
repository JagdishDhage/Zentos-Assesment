import React from "react";
import "./App.css";
import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Component/Home/Home";
import Dashboard from "./Component/Dashbord/Dashbord";
import BoardDetail from "./Component/Board/BoardDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='board/:id' element={<BoardDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
