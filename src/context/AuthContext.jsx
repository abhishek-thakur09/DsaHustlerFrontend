import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged in user on start
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/loggedinUser");
        setUser(res.data.user || res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // LOGIN
  const loginUser = async (email, password) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      setUser(res.data.user);

      return res.data.user;
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    } finally {
      setLoading(false);
    }
  };

  // UPDATE USER
 const updateUser = async (data) => {
  try {
    setLoading(true);

    const res = await api.patch("/auth/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setUser(res.data.user);

    return res.data.user;

  } catch (err) {
    throw err.response?.data?.message || "Update failed";
  } finally {
    setLoading(false);
  }
};


  // LOGOUT
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        loginUser,
        updateUser,
        logout,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
