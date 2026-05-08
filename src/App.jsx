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
import CodeEditor1 from "./components/CodeEditor1";
import EditProblem from "./components/EditProblem";
import UpdateProblem from "./components/UpdateProblem";
import AddProblem from "./components/AddProblem";
import ManageProblems from "./components/EditProblem";
import ManageUsers from "./components/ManageUsers";
import Contact from "./components/Contact";
import About from "./components/About";
import AIhint from "./components/AiChat";
import CodeRunner from "./components/CodeRunner";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/auth/loggedinUser", {
      withCredentials: true,
    })
      .then((res) => {
        dispatch(setUser(res.data.user));
      })
      .catch(() => {});
  }, [dispatch]);


  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element={<Problems />}/>
      <Route path= "/profile" element={<Profile />}/>
      <Route path= "/updateProfile" element={<EditProfile />}/>
      <Route path="/signin" element={<Register />} />
      <Route path="/singleProblem/:id" element={<CodeEditor1 />}></Route>
      <Route path="/manageproblems" element={ <EditProblem/>}></Route>
      <Route path="/edit-problem/:id" element = {<UpdateProblem/>}></Route>
      <Route path="/add-problem" element = {<AddProblem/>}></Route>
      <Route path="/manage-users" element= {<ManageUsers/>}></Route>
      <Route path="/contact" element = {<Contact/>}></Route>
      <Route path="/about" element= {<About/>}></Route>
      <Route path="/aihint" element={<AIhint/>}></Route>
      <Route path="/singleProblem/:id" element={<CodeRunner />}/>
    </Routes>
    </>
  );
}

export default App;
