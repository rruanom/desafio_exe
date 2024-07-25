import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginGoogle from "./LoginGoogle/LoginGoogle";
import Dashboard from "./Dashboard/Dashboard";

const Main = () => {
  return (
  <main className="main">
    <Routes>
      <Route path="/login" element={<LoginGoogle />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </main>
  );
};

export default Main;
