import React from "react";
import { Route, Routes } from "react-router-dom";
import Candidates from "../../pages/Candidates";
import UserHome from "../../pages/UserHome";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import UnauthorizedPage from "../../pages/UnauthorizedPage";
import Details from '../../pages/Details';
import CandidateHome from "../../components/CandidatesHome/CandidatesHome";
import StaffHome from "../../components/StaffHome/StaffHome";
import { useAuth } from "../../context/Authcontext";

const Main = () => {
  const { user } = useAuth();

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={user?.isStaff ? <StaffHome /> : <CandidateHome />} />
        <Route path="/candidatos" element={<Candidates />} />
        <Route path="/profile" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:email" element={<Details />} />
        <Route path="/*" element={<UnauthorizedPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidate-home" element={<CandidateHome />} />
        <Route path="/staff-home" element={<StaffHome />} />
      </Routes>
    </main>
  );
};

export default Main;