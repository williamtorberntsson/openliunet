import "./App.css";

const TerminsTider = ({show}) => {
  if (!show) {
    return null
  }

  return (
    <div className="Information">
      <div className="Tekfak">
        <h2>TekFak Spring 2023</h2>
        <ul>
          <li>16 Jan - 10 Mar: Study period VT1</li>
          <li>13 Mar - 13 Mar: Self study</li>
          <li>14 Mar - 17 Mar: Re-examination period HT2</li>
          <li>20 Mar - 25 Mar: Examination period VT1</li>
          <li>27 Mar - 23 May: Study period VT2</li>
          <li>19 May - 19 May: Self study</li>
          <li>22 May - 23 May: Scedule time</li>
          <li>24 May - 26 May: Self study</li>
          <li>29 May - 3 Jun: Examination period VT2</li>
          <li>5 Jun - 5 Jun: Re-examination period VT1</li>
          <li>7 Jun - 9 Jun: Re-examination period VT1</li>
        </ul>
        <h2>TekFak Autumn 2023</h2>
        <ul>
          <li>2023-08-28 (v 35) - 2024-01-13 (v 2)</li>
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