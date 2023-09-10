import './App.css'
import React, { useState } from 'react'
import FetchDataComponent from './FetchDataComponent'
import { createRoot } from 'react-dom/client'

function QueryComponent () {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')

  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://shipon.lysator.liu.se:5829/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data.result)
        const root = createRoot(document.getElementById('fetchDataContainer'));
        root.render(<FetchDataComponent apiUrl={data.result} />);
      } else {
        console.error('Error performing query')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Skriv in en kurskod'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleButtonClick}>Sök!</button>
      <div id='fetchDataContainer'>
      </div>
    </div>
  )
}

export default QueryComponent
