import "./App.css";

const TerminsTider = ({show}) => {
  if (!show) {
    return null
  }

  return (
    <div className="Information">
      <p><a target="_blank" rel="noopener noreferrer" href="https://liu.se/artikel/terminstider">Also available from the source</a></p>
      <div className="Tekfak">
        <h2>TekFak Autumn 2024</h2>
        <ul>
          <li>2024-08-19 (v 34) - 2025-01-18 (v 3)</li>
          <li>19 Aug - 31 Aug: Re-examination period</li>
          <li>2 Sep - 3 Nov: Study period HT1</li>
          <li>25 Oct - 3 Nov: (Re-)Examination period HT1</li>
          <li>4 Nov - 19 Jan: Study Period HT2</li>
          <li>7 Jan - 10 Jan: Re-examination period HT1+VT2</li>
          <li>13 Jan - 19 Jan: Examination period HT2</li>
        </ul>
        <h2>TekFak Spring 2025</h2>
        <ul>
          <li>2025-01-20 (v 4) - 2025-06-12 (v 24)</li>
          <li>20 Jan - 30 Mar: Study period VT1</li>
          <li>17 Mar - 20 Mar: Re-examination period HT2</li>
          <li>21 Mar - 30 Mar: Examination period VT1</li>
          <li>31 Mar - 12 Jun: Study Period VT2</li>
          <li>28 May - 5 Jun: Examination period VT2</li>
          <li>9 Jun - 12 Jun: Re-examination period VT1</li>
        </ul>
      </div>
      <div className="FilFak">
        <h2>FilFak Autumn 2024</h2>
        <ul>
          <li>2024-08-19 (v 34) – 2025-01-19 (v 3)</li>
        </ul>
        <h2>FilFak Spring 2025</h2>
        <ul>
          <li>2025-01-20 (v 4) - 2024-06-08 (v 23)</li>
        </ul>
      </div>
      <div className="MedFak">
        <h2>MedFak Autumn 2024</h2>
        <ul>
          <li>2024-08-26 (v 35) - 2025-01-12 (v 2)</li>
        </ul>
        <h2>MedFak Spring 2025</h2>
        <ul>
          <li>2025-01-20 (v 4) - 2025-06-08 (v 23)</li>
        </ul>
      </div>
    </div>
  )
}

export default TerminsTider;
