import "./App.css";

const Karta = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="Information">
      <div className="Tekfak">
        <h2>Campus karta</h2>
        <ul>
          <li>
            <a href="https://use.mazemap.com/#v=1&config=liu&zlevel=2&center=15.576785,58.398489&zoom=15.1&campusid=742">Campus Linköping</a>
          </li>
          <li>
            <a href="https://use.mazemap.com/#v=1&config=liu&zlevel=1&center=16.176629,58.588978&zoom=16.1&campusid=754">Campus Norrköping</a>
          </li>
          <li>
            <a href="https://use.mazemap.com/#v=1&config=liu&zlevel=9&center=15.619532,58.401014&zoom=15.9&campusid=781">Campus US</a>
          </li>
          <li>
            <a href="https://use.mazemap.com/#v=1&config=liu&zlevel=1&center=18.143572,59.351345&zoom=17.2&campusid=753">Campus Lidingö</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Karta;
