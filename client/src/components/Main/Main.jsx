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
import Staff from "../../pages/Staff";
import { useAuth } from "../../context/Authcontext";
import CandidateForm from "../../pages/CandidateForm/CandidateForm";
import Analytics from '../../pages/Analytics';

const Main = () => {
  const { userType } = useAuth();

  return (
    <main className="main">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              {userType === 'staff' ? <StaffHome /> : <CandidateHome />}
            </PrivateRoute>
          } 
        />
        <Route 
          path="/candidatos" 
          element={
            <PrivateRoute>
              <Candidates />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <UserHome />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/details/:email" 
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/form" 
          element={
            <PrivateRoute>
              <CandidateForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/staff" 
          element={
            <PrivateRoute>
              <Staff />
            </PrivateRoute>
          } 
        />
        <Route path="/*" element={<UnauthorizedPage />} />
      </Routes>
    </main>
  );
};

export default Main;