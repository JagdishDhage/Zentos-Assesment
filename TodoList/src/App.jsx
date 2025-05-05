import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router'
import Navbar from './Component/Header/Navbar'
import Home from './Component/Home/Home'
import Dashbord from './Component/Dashbord/Dashbord'
import Login from './Component/Auth/Login'
import Register from './Component/Auth/Register'
import PrivateRoute from'./util/Protected'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/login' element={<Login/>}/> 
      <Route path='/Register' element={<Register/>}/> 
      <Route path='/dashbord' element={
       <PrivateRoute>
       <Dashbord />
     </PrivateRoute>}
      /> 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
