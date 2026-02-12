import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Problems from "./components/Problems";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import EditProfile from "./components/EditProfile";


function App() {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/problems" element={<Problems />}/>
      <Route path= "/profile" element={<Profile/>}/>
      <Route path= "/updateProfile" element={<EditProfile />}/>
    </Routes>
    </>
  );
}

export default App;
