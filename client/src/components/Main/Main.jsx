import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginGoogle from "./LoginGoogle/LoginGoogle";
import Candidates from "./Candidates/Candidates";
import UserHome from "./UserHome/UserHome";
import Dashboard from "./Dashboard/Dashboard";

const Main = () => {
  return (
  <main className="main">
    <Routes>
      <Route path="/login" element={<LoginGoogle />} />
      <Route path="/candidatos" element={<Candidates />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </main>
  );
};

export default Main;
