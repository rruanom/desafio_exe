import React from "react";
import { Route, Routes} from "react-router-dom";
import Candidates from "../../pages/Candidates";
import UserHome from "../../pages/UserHome";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import UnauthorizedPage from "../../pages/UnauthorizedPage"
// import PrivateRoute from "../../components/PrivateRoute"
import Details from '../../pages/Details';

const Main = () => {
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

      
      {/* <Route
        path="/admin"
        element={
            <PrivateRoute roles={['admin']}>
                <Dashboard/>
            </PrivateRoute>
        }
      /> */}
    </Routes>
  </main>
  );
};

export default Main;
