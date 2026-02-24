import React, { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";




const HomePage = () => {
  const navigate = useNavigate();
  const [user, setTotalUsers] = useState(0);
  const [totalProblems, settotalProblems] = useState(0);
  const Loggedinuser = useSelector((state) => state.auth.user);

  console.log(Loggedinuser);

  const isAdmin = Loggedinuser?.role === "admin";

  useEffect(()=>{

    const users = async()=>{
      const res = await api.get("/auth/stats");
      setTotalUsers(res.data.totalUsers);
    }
    users();
  },[])

    useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.get("/api/problems?page=1&limit=10");

        settotalProblems(res.data.total);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAll();
  }, []);


  return (
    <>
     {isAdmin &&
      // ✅ ADMIN DASHBOARD
      <div className="min-h-[90vh] flex items-center justify-center bg-black text-white relative overflow-hidden">
  {/* glow background */}
  <div className="absolute w-[600px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>

  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

    {/* TITLE */}
    <h1
      className="text-4xl sm:text-6xl lg:text-7xl
      bg-gradient-to-r from-purple-300 to-pink-400
      bg-clip-text text-transparent
      font-bold leading-tight"
    >
      Admin Dashboard
    </h1>

    {/* SUBTITLE */}
    <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
      Manage problems, control users, and monitor platform activity.
      Full administrative access enabled.
    </p>

    {/* ACTION BUTTONS */}
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">

      {/* ADD PROBLEM */}
      <button
        onClick={() => navigate("/add-problem")}
        className="
        p-6 rounded-xl
        bg-gradient-to-r from-blue-500 to-cyan-400
        hover:scale-105 transition
        shadow-lg"
      >
        <h3 className="text-xl font-semibold">Add Problem</h3>
        <p className="text-sm opacity-80">Create new coding problems</p>
      </button>

      {/* MANAGE PROBLEMS */}
      <button
        onClick={() => navigate(`/manageproblems`)}
        className="
        p-6 rounded-xl
        bg-gradient-to-r from-emerald-500 to-teal-400
        hover:scale-105 transition
        shadow-lg"
      >
        <h3 className="text-xl font-semibold">Edit Problems</h3>
        <p className="text-sm opacity-80">Edit or delete problems</p>
      </button>

      {/* MANAGE USERS */}
      <button
        onClick={() => navigate("/manage-users")}
        className="
        p-6 rounded-xl
        bg-gradient-to-r from-purple-500 to-pink-400
        hover:scale-105 transition
        shadow-lg"
      >
        <h3 className="text-xl font-semibold">Manage Users</h3>
        <p className="text-sm opacity-80">View platform users</p>
      </button>

      {/* ANALYTICS */}
      <button
        onClick={() => navigate("/#")}
        className="
        p-6 rounded-xl
        bg-gradient-to-r from-orange-500 to-red-400
        hover:scale-105 transition
        shadow-lg"
      >
        <h3 className="text-xl font-semibold">Analytics</h3>
        <p className="text-3xl opacity-80">Comming Soon</p>
      </button>

    </div>
  </div>
</div>
 } 
 
 {!isAdmin &&
  
      <div>
      <section className="min-h-[90vh] flex items-center justify-center bg-black text-white relative overflow-hidden">
        {/* subtle glow */}
        <div className="absolute w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* TITLE */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl 
               bg-gradient-to-r from-cyan-100 to-indigo-500 
               bg-clip-text text-transparent 
               font-bold leading-tight">
            Master Coding <br />
            <span className="bg-gradient-to-r from-emerald-200 via-cyan-100 to-blue-400 text-transparent bg-clip-text">
              Through Patterns, Not Random Problems
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Learn algorithms the right way with structured pattern-based
            questions. Build intuition, recognize problem types instantly, and
            solve interviews with confidence.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/problems")}
              className="
              px-8 py-3 rounded-lg
              bg-blue-400 text-white font-medium
              hover:bg-blue-300
              transition
              flex items-center gap-2 justify-center
              shadow-[0_0_20px_rgba(52,211,153,0.4)]
            "
            >
              Start Practicing →
            </button>

            <button
              onClick={() => navigate("/problems")}
              className="
              px-8 py-3 rounded-lg
              bg-white/5 border-cyan-400 text-cyan-300
              hover:bg-white/10
              transition
            "
            >
              Explore Problems
            </button>
          </div>

          {/* STATS */}
          <div className="mt-14 grid grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold text-cyan-400">{totalProblems}+</h3>
              <p className="text-gray-400 text-sm">Problems</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-cyan-400">{user}</h3>
              <p className="text-gray-400 text-sm">Users</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-cyan-400">0</h3>
              <p className="text-gray-400 text-sm">Submissions</p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        
      </footer>
      </div>     
    }
    </>
  );
};

export default HomePage;
