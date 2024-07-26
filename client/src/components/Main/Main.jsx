import React from "react";
import { Route, Routes} from "react-router-dom";
import Candidates from "../../pages/Candidates";
import UserHome from "../../pages/UserHome";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import UnauthorizedPage from "../../pages/UnauthorizedPage"
import PrivateRoute from "../../components/PrivateRoute"

const Main = () => {
  return (
  <main className="main">
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/candidatos" element={<Candidates />} />
      <Route path="/profile" element={<UserHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<UnauthorizedPage />} />
      <Route
        path="/admin"
        element={
            <PrivateRoute roles={['admin']}>
                <Dashboard/>
            </PrivateRoute>
        }
      />
    </Routes>
  </main>
  );
};

export default Main;
