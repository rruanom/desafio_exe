import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import Main from "./components/Main";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;