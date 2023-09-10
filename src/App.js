import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TerminsTider from './TerminsTider';
import AktuelltNummer from './AktuelltNummer';
import './App.css';

function App() {

  const [termin, setTermin] = useState(false);
  const [aktuelltnummer, setAktuelltNummer] = useState(false);

  const toggleTermin = () => setTermin(!termin);
  const toggleAktuellNummer = () => setAktuelltNummer(!aktuelltnummer);

  return (
    <div className='Main'>
      <div className="App">
        <div className="Button">
          <Link to="https://cloud.timeedit.net/liu/web/schema/" target="_blank" rel="noopener noreferrer">
            <div className='Text Schema'>
              Schema
            </div>
          </Link>
        </div>

        <div className="Button">
          <Link to="https://portalliu.onricoh.se/" target="_blank" rel="noopener noreferrer">
            <div className='Text Printa'>
              Printa
            </div>
          </Link>
        </div>

        <div className="Button">
          <Link to="https://cloud.timeedit.net/liu/web/wr_stud/" target="_blank" rel="noopener noreferrer">
            <div className='Text Boka'>
              Boka Sal
            </div>
          </Link>
        </div>

        <div className="Button">
          <Link to="https://ysektionen.se/student/tentastatistik/" target="_blank" rel="noopener noreferrer">
            <div className='Text Tenta'>
              Tentastatistik
              (tek, fil, med finns)
            </div>
          </Link>
        </div>

        <div className="Button">
          <Link to="https://minit.liu.se/" target="_blank" rel="noopener noreferrer">
            <div className='Text MinIT'>
              MinIT
            </div>
          </Link>
        </div>

        <div className="Button" onClick={toggleTermin}>
          <div className='Text Termin'>
            <u>Terminstider</u>
          </div>
        </div>
      </div>
      
        <div className="Button" onClick={toggleAktuellNummer}>
            <div className='Text Forflutna'>
              Aktuellt föreläsnings-nummer
            </div>
        </div>

      <Link to="https://github.com/williamtorberntsson/openliunet" target="_blank" rel="noopener noreferrer">
        <div className='Github'>
          Github page to contribute!
        </div>
      </Link>

      <TerminsTider show={termin} />

<AktuelltNummer show={aktuelltnummer}/>

    </div>
  );
}

export default App;
