import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
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
      </div>

      <Link to="https://github.com/williamtorberntsson/openliunet" target="_blank" rel="noopener noreferrer">
        <div className='Github'>
          Github page to contribute!
        </div>
      </Link>
    </div>
  );
}

export default App;
