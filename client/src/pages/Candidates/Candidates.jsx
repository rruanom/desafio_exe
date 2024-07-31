import { useState } from "react";
import Pipeline from "../../components/Pipeline";
import Database from "../../components/Database";

const Candidates = () => {
  const [view, setView] = useState('pipeline'); 

  return (
    <section className="candidatesContainer">
      <div>
        <button className="btnCandidates" onClick={() => setView('pipeline')}>Pipeline</button>
        <button className="btnCandidates" onClick={() => setView('database')}>Database</button>
      </div>
      <section className="pipelineDatabaseContainer">
      {view === 'pipeline' && <Pipeline />}
      {view === 'database' && <Database />}
      </section>
    </section>
  );
};

export default Candidates;