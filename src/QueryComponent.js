import './App.css'
import React, { useState } from 'react'
import FetchDataComponent from './FetchDataComponent'
import { createRoot } from 'react-dom/client'

function QueryComponent () {
  const [root, setRoot] = useState(null)
  const [course, setCourse] = useState('')
  const [studentGroup, setStudentGroup] = useState('')

  /**
   * Send POST request to the server with the query
   * and render the result in the DOM
   */
  const performQuery = async () => {
    try {
      const response = await fetch('http://shipon.lysator.liu.se:5829/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: course })
      })

      if (response.ok) {
        const data = await response.json()
        const fetchDataContainer = document.getElementById('fetchDataContainer')
        if (fetchDataContainer && fetchDataContainer instanceof HTMLElement) {
          const fetchDataComponent = (
            <FetchDataComponent
              apiUrl={data.result}
              studentGroup={studentGroup}
            />
          )
          if (root == null) {
            console.log('Creating root')
            const newRoot = createRoot(fetchDataContainer)
            newRoot.render(fetchDataComponent)
            setRoot(newRoot)
          } else {
            root.render(fetchDataComponent)
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      performQuery()
    }
  }

  return (
    <div className='Information'>
      <h2>Föreläsningsnummer</h2>
      <p>Hur många föreläsningar har passerat i en kurs?</p>
      <input
        type='text'
        placeholder='Skriv en kurskod (t.ex. TATA24)'
        value={course}
        onChange={e => setCourse(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type='text'
        placeholder='Skriv en studentgrupp (t.ex. D2.c)'
        value={studentGroup}
        onChange={e => setStudentGroup(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={performQuery}>Sök!</button>
      <div id='fetchDataContainer'></div>
    </div>
  )
}

export default QueryComponent
