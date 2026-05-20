import React,{useEffect,lazy, Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./Slice/AuthSlice";
import api from "./utils/api";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Problems from "./components/Problems";
import Profile from "./components/Profile";
import RoadMap from "./components/RoadMap";

// lazy loads
const Register = lazy(() => import("./components/Register"));
const EditProfile = lazy(() => import("./components/EditProfile"));
const CodeEditor1 = lazy(() => import("./components/CodeEditor1"));
const CodeRunner = lazy(()=> import("./components/CodeRunner"));
const EditProblem = lazy(() => import("./components/EditProblem"));
const UpdateProblem = lazy(() => import("./components/UpdateProblem"));
const AddProblem = lazy(() => import("./components/AddProblem"));
const ManageUsers = lazy(() => import("./components/ManageUsers"));
const Contact = lazy(() => import("./components/Contact"));
const About = lazy(() => import("./components/About"));
const AIhint = lazy(() => import("./components/AiChat"));


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
      <Route path="/roadmap" element={<RoadMap/>}/>
    </Routes>
    </>
  );
}

export default App;
