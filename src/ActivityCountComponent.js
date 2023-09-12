import './App.css'
import './Activity.css'
import React, { useState } from 'react'
import ActivityTable from './ActivityTable'
import { createRoot } from 'react-dom/client'
import { Link } from 'react-router-dom'

/**
 * Returns a component that asks user for a course code and student group,
 * then shows the number of lectures/other activites that have passed
 * @param {boolean} show whether to show the component or not
 * @returns
 */
function ActivityCountComponent ({ show }) {
  const [course, setCourse] = useState('')
  const [studentGroup, setStudentGroup] = useState('')
  const [scheduleUrls, setScheduleUrls] = useState(null)
  const [shouldShowURLs, setShouldShowURLs] = useState(false)
  if (!show) {
    return null
  }

  const performQuery = async () => {
    try {
      const response = await fetch('http://shipon.lysator.liu.se:5829/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: course.toUpperCase() })
      })

      if (response.ok) {
        const data = await response.json()
        const fetchDataContainer = document.getElementById(
          'activityTableContainer'
        )
        setScheduleUrls(data.result)

        const fetchDataComponent = (
          <ActivityTable url={data.result} studentGroup={studentGroup} />
        )
        const root = createRoot(fetchDataContainer)
        root.render(fetchDataComponent)
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
      <h2>Undervisningsnummer</h2>
      <p>
        Visar hur många förläsningar, lektioner, etc. som har passerat i en
        kurs.
      </p>
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
      <div id='activityTableContainer'></div>
      {shouldShowURLs && scheduleUrls && (
        <table className='UrlTable'>
          <tr>
            <td>terminschema</td>
            <td>
              <Link to={scheduleUrls.split(' ')[0]}>
                {scheduleUrls.split(' ')[0]}
              </Link>
            </td>
          </tr>
          <tr>
            <td>idag-framåt-schema</td>
            <td>
              <Link to={scheduleUrls.split(' ')[1]}>
                {scheduleUrls.split(' ')[1]}
              </Link>
            </td>
          </tr>
        </table>
      )}
      <button onClick={() => setShouldShowURLs(!shouldShowURLs)}>
        {shouldShowURLs ? '✓ ' : ''}
        se TimeEdit-URLs
      </button>
    </div>
  )
}

export default ActivityCountComponent