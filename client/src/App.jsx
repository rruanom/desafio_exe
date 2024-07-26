import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import Main from "./components/Main";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header /> 
                <Main />
                <Footer /> 
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
