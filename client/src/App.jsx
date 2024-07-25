import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage'; 
import UnauthorizedPage from './components/UnauthorizedPage'; 
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import Main from "./components/Main";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header /> 
                <Main />
                <Footer /> 
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute roles={['admin']}>
                                <AdminPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
