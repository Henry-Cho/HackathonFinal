import './App.css';
import Navbar from './Navbar';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home'
import Goal from "../pages/Goal"
import History from "../pages/History"
import Charts from "../pages/Charts";
import React from 'react';
import {Routes, Route} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import {apiKey} from "./firebase";
import { loginCheckFB } from "../redux/modules/userList"
import { useEffect, useState} from "react";
import Category from '../pages/Category';
// import { ConnectedRouter } from "connected-react-router"
// import { history } from "../redux/store" 

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  useEffect(() => {
    
    if(is_session){
      dispatch(loginCheckFB());
    }

  }, []);


  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/goal" element={<Goal/>} />
          <Route path="/chart" element={<Charts/>} />
          <Route path="/history" element={<History/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:category_type" element={<Category />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
