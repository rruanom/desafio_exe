import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import Main from "./components/Main";

const App = () => {
  return (
    <Router>
      <Header /> 
      <Main />
      <Footer /> 
    </Router>
  );
};

export default App;