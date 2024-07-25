import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginGoogle from "./LoginGoogle/LoginGoogle";
import Candidates from "./Candidates/Candidates";

const Main = () => {
  return (
  <main className="main">
    <Routes>
      <Route path="/login" element={<LoginGoogle />} />
      <Route path="/candidatos" element={<Candidates />} />
    </Routes>
  </main>
  );
};

export default Main;
