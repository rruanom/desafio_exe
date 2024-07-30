import React from "react";
import { Route, Routes } from "react-router-dom";
import Candidates from "../../pages/Candidates";
import UserHome from "../../pages/UserHome";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import UnauthorizedPage from "../../pages/UnauthorizedPage";
import Details from '../../pages/Details';
import CandidateHome from "../CandidatesHome/CandidatesHome";
import StaffHome from "../StaffHome";
import PrivateRoute from "../PrivateRoute";
import { useAuth } from "../../context/Authcontext";
import CandidateForm from "../../pages/CandidateForm/CandidateForm";
import Analytics from '../../pages/Analytics';

const Main = () => {
  const { userType } = useAuth();

  return (
  <main className="main">
    <Routes>
      <Route path="/" element={<UserHome />}/>
      <Route path="/candidatos" element={<Candidates />} />
      <Route path="/profile" element={<UserHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details/:email" element={<Details />} />
      <Route path="/*" element={<UnauthorizedPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />

      
      {/* <Route
        path="/admin"
        element={
            <PrivateRoute roles={['admin']}>
                <Dashboard/>
            </PrivateRoute>
          } 
        />
        <Route path="/*" element={<UnauthorizedPage />} />
      </Routes>
    </main>
  );
};

export default Main;