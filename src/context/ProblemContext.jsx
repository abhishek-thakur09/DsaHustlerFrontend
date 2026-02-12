import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const ProblemsContext = createContext();

export const ProblemsProvider = ({ children }) => {
  const [allProblems, setAllProblems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.get("/api/problems?page=1&limit=10");

        setAllProblems(res.data.problems);
        console.log(res.data.problems)
        setTotal(res.data.total);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <ProblemsContext.Provider
      value={{
        allProblems,
        total,
        loading,
      }}
    >
      {children}
    </ProblemsContext.Provider>
  );
};
