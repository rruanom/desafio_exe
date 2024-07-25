import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginGoogle from "./LoginGoogle/LoginGoogle";
import UserHome from "./UserHome/UserHome";

const Main = () => {
  return (
  <main className="main">
    <Routes>
      <Route path="/login" element={<LoginGoogle />} />
      <Route path="/userhome" element={<UserHome />} />
    </Routes>
  </main>
  );
};

export default Main;
