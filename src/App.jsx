import React,{useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./Slice/AuthSlice";
import api from "./utils/api";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Problems from "./components/Problems";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import EditProfile from "./components/EditProfile";
import Register from "./components/Register";
import ProblemDetails from "./components/ProblemDetails";
import EditProblem from "./components/EditProblem";
import UpdateProblem from "./components/UpdateProblem";
import AddProblem from "./components/AddProblem";
import ManageProblems from "./components/EditProblem";
import ManageUsers from "./components/ManageUsers";
import Contact from "./components/Contact";
import About from "./components/About";
import AIhint from "./components/AIhint";


function App() {
  const dispatch = useDispatch();


   useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      // if no token → user not logged in
      if (!token) return;

      try {
        // verify token + fetch user
        const res = await api.get("/auth/loggedinUser");
        dispatch(setUser(res.data.user));
      } catch (err) {
        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, []);

  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/problems" element={<Problems />}/>
      <Route path= "/profile" element={<Profile />}/>
      <Route path= "/updateProfile" element={<EditProfile />}/>
      <Route path="/signin" element={<Register />} />
      <Route path="/singleProblem/:id" element={<ProblemDetails />}></Route>
      <Route path="/manageproblems" element={ <EditProblem/>}></Route>
      <Route path="/edit-problem/:id" element = {<UpdateProblem/>}></Route>
      <Route path="/add-problem" element = {<AddProblem/>}></Route>
      <Route path="/manage-users" element= {<ManageUsers/>}></Route>
      <Route path="/contact" element = {<Contact/>}></Route>
      <Route path="/about" element= {<About/>}></Route>
      <Route path="/aihint" element={<AIhint/>}></Route>
    </Routes>
    </>
  );
}

export default App;
