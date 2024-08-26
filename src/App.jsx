import React, { useState } from "react";
import { Link } from "react-router-dom";
import TerminsTider from "./TerminsTider";
import Karta from "./Karta";
import "./App.css";

function App() {

  const [termin, setTermin] = useState(false);
  const toggleTermin = () => setTermin(!termin);

  return (
    <div className="Main">
      <div className="App">
        <div className="Button">
          <Link to="https://cloud.timeedit.net/liu/web/schema/" target="_blank" rel="noopener noreferrer">
            <div className="Text Schema Round">
              Schema
            </div>
          </Link>
        </div>

        <div className="Button">
          <Link to="https://portalliu.onricoh.se/" target="_blank" rel="noopener noreferrer">
            <div className="Text Printa Circle">
              Printa
            </div>
          </Link>
        </div>

        <div className="Button">
          <Link to="https://cloud.timeedit.net/liu/web/wr_stud/" target="_blank" rel="noopener noreferrer">
            <div className="Text Boka Round">
              Boka Sal
            </div>
          </Link>
        </div>

        <div className="Button">
          <Link to="https://ysektionen.se/student/tentastatistik/" target="_blank" rel="noopener noreferrer">
            <div className="Text Tenta Circle">
              Tentastatistik
              (tek, fil, med finns)
            </div>
          </Link>
        </div>

        <div className="Button">
          <Link to="https://minit.liu.se/" target="_blank" rel="noopener noreferrer">
            <div className="Text MinIT Round">
              MinIT
            </div>
          </Link>
        </div>

        <div className="Button" onClick={toggleTermin}>
          <div className="Text Termin Circle">
            <u>Terminstider</u>
          </div>
        </div>

        <Karta />

      </div>

      <TerminsTider show={termin} />

      <Link to="https://github.com/williamtorberntsson/openliunet" target="_blank" rel="noopener noreferrer">
        <div className="Github">
          Github page to contribute!
        </div>
      </Link>

    </div>
  );
}

export default App;
