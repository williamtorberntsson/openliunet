import "./App.css";

const TerminsTider = ({show}) => {
  if (!show) {
    return null
  }

  return (
    <div className="Information">
      <div className="Tekfak">
        <h2>TekFak Spring 2023</h2>
        <p><a href="https://liu.se/organisation/liu/lith/terminstider-for-tekniska-hogskolan">Also available from the source</a></p>
        <h2>TekFak Autumn 2023</h2>
        <ul>
          <li>2023-08-28 (v 35) - 2024-01-13 (v 2)</li>
          <li>15 Aug - 27 Aug: Re-examination period</li>
          <li>28 Aug - 18 Oct: Study period HT1</li>
          <li>19 Oct - 20 Oct: Self study</li>
          <li>23 Oct - 28 Oct: Examination period HT1</li>
          <li>30 Oct - 22 Dec: Study Period HT2</li>
          <li>27 Dec - 29 Dec: Self study</li>
          <li>2 Jan - 5 Jan: Re-examination period HT1+VT2</li>
          <li>8 Jan - 13 Jan: Examination period HT2</li>
        </ul>
        <h2>TekFak Spring 2024</h2>
        <ul>
          <li>15 Jan - 8 Mar: Study period VT1</li>
          <li>11 Mar - 11 Mar: Self study</li>
          <li>12 Mar - 15 Mar: Re-examination period HT2</li>
          <li>18 Mar - 23 Mar: Examination period VT1</li>
          <li>25 Mar - 22 May: Study Period VT2</li>
          <li>23 May - 24 May: Self Study</li>
          <li>27 May - 1 Jun: Examination period VT2</li>
          <li>3 Jun - 5 Jun: Re-examination period VT1</li>
          <li>7 Jun - 7 Jun: Re-examination period VT1</li>
        </ul>
      </div>
      <div className="FilFak">
        <h2>FilFak Spring 2023</h2>
        <ul>
          <li>2023-01-23 (v 4) – 2023-06-11 (v 23)</li>
        </ul>
        <h2>FilFak Autumn 2023</h2>
        <ul>
          <li>2023-08-21 (v 34) - 2024-01-21 (v 3)</li>
        </ul>
      </div>
      <div className="MedFak">
        <h2>MedFak Spring 2023</h2>
        <ul>
          <li>2023-01-23 (v 4) - 2023-06-11 (v 23)</li>
        </ul>
        <h2>MedFak Autumn 2023</h2>
        <ul>
          <li>2023-08-28 (v 35) - 2024-01-14 (v 2)</li>
        </ul>
      </div>
    </div>
  )
}

export default TerminsTider;
