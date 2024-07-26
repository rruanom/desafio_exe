import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginGoogle from "./LoginGoogle/LoginGoogle";
import Candidates from "./Candidates/Candidates";
import UserHome from "./UserHome/UserHome";
import Dashboard from "./Dashboard/Dashboard";
import Details from './Details';
import Grades from './Details/Grades';
import Profile from './Details/Grades';

const Main = () => {
  return (
  <main className="main">
    <Routes>
      <Route path="/login" element={<LoginGoogle />} />
      <Route path="/candidatos" element={<Candidates />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/details/:email" element={<Details />} />
      <Route path="/grades/:email" element={<Grades />} />
      <Route path="/profile/:email" element={<Profile />} />
    </Routes>
  </main>
  );
};

export default Main;
