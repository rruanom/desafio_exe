import React from "react";
import SearchDashboard from "./SearchDashboard/SearchDashboard";
import Redirector from './Redirector';
import Overview from './Overview';

const Dashboard = () => {
  return <section className="dashboard">
    <article>
      <SearchDashboard />
      <Redirector />
      <Overview />
    </article>
  </section>
};

export default Dashboard;
