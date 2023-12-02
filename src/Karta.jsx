import "./App.css";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Karta = () => {

  const [show, setShow] = useState(false);
  const toggleKarta = () => setShow(!show)

  if (show) {
    return (
      <div className="Kartor" onClick={toggleKarta}>
        <Link to="https://use.mazemap.com/#v=1&config=liu&zlevel=2&center=15.576785,58.398489&zoom=15.1&campusid=742" target="_blank" rel="noopener noreferrer">
          <div className="Button" onClick={toggleKarta}>
            <div className='Text Karta'>
              <u>Valla</u>
            </div>
          </div>
        </Link>

        <Link to="https://use.mazemap.com/#v=1&config=liu&zlevel=1&center=16.176629,58.588978&zoom=16.1&campusid=754" target="_blank" rel="noopener noreferrer">
          <div className="Button" onClick={toggleKarta}>
            <div className='Text Karta'>
              <u>Norrköping</u>
            </div>
          </div>
        </Link>

        <Link to="https://use.mazemap.com/#v=1&config=liu&zlevel=9&center=15.619532,58.401014&zoom=15.9&campusid=781" target="_blank" rel="noopener noreferrer">
          <div className="Button" onClick={toggleKarta}>
            <div className='Text Karta'>
              <u>Us</u>
            </div>
          </div>
        </Link>
      </div >
    )
  } else {
    return (
      <div className="Button" onClick={toggleKarta}>
        <div className='Text Karta'>
          <u>Karta</u>
        </div>
      </div>
    )
  }

};

export default Karta;
